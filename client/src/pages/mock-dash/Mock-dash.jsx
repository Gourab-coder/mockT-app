import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Mock-dash.css";
import Footer from "../../components/Footer/Footer";
import Header_home from "../../components/Header/Header";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import jsPDF from 'jspdf';
import { handleSuccess, handleError } from "../../Utils";
import SuccessPopup from "../test-creation/SuccessPopup";


export default function Mock_dash() {
    const [createdTests, setCreatedTests] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [showScorePopup, setShowScorePopup] = useState(false);
    const [showLinkPopup, setShowLinkPopup] = useState(false);
    const [currentTestLink, setCurrentTestLink] = useState("");
    const navigate = useNavigate();
    
    const userData = {
        name:  localStorage.getItem('name') || "",
        email: localStorage.getItem('email') || "",
        token: localStorage.getItem('token') || ""
    };
    // console.log(userData);

    // Fetches the list of tests created by the logged-in user from the API.
    const fetchCreatedTests = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/enquiry/user-data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log(data);

            // Sort tests by creation date, newest first, and update state
            setCreatedTests(Array.isArray(data.createdTests) ? data.createdTests : []);

        } catch (error) {
            handleError("Failed to fetch your tests. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetches tests when the component mounts, ensuring the user is authenticated.
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); 
            return;
        }
        fetchCreatedTests();
    }, [navigate]);

    // Closes any open action menus when the user clicks outside of them.
    useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenuId(null); 
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const testsToShow = showAll ? createdTests : createdTests.slice(0, 5);

    // Toggles the visibility of the action menu for a specific test.
    const handleMenuToggle = (e, testId) => {
        e.stopPropagation(); // Prevent click from bubbling up to the document
        setOpenMenuId(prevId => (prevId === testId ? null : testId));
    };

    // Sends a request to the API to delete a specific test and updates the UI.
    const handleDeleteTest = async (testToDelete) => {
        console.log("Deleting test:", testToDelete.testId);

        try {
            const url = `${import.meta.env.VITE_API_URL}/enquiry/delete-test/${testToDelete.testId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                }
            });

            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            handleSuccess(data.message || "Test deleted successfully!");
            
            // Update the state to remove the deleted test from the UI
            setCreatedTests(prevTests => prevTests.filter(test => test._id !== testToDelete._id));
        } catch (error) {
            handleError("Failed to delete the test. Please try again.");
        }
        setOpenMenuId(null);
    };

    // Fetches full test data and generates a downloadable PDF document.
    const handleDownloadPDF = async (test) => {
        console.log("Downloading PDF for test:", test.testId);
        setOpenMenuId(null);

        try {
            // 1. Fetch the full test data
            const url = `${import.meta.env.VITE_API_URL}/enquiry/test/${test.testId}`;
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${userData.token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch test data for PDF generation.');
            }
            const testData = await response.json();

            // 2. Generate the PDF
            const doc = new jsPDF();
            let y = 20; // Vertical position start

            doc.setFontSize(18);
            doc.text(testData.name, 105, y, { align: 'center' });
            y += 10;

            doc.setFontSize(12);
            doc.text(`Description: ${testData.description}`, 14, y);
            y += 7;
            doc.text(`Time Limit: ${testData.timeLimit} minutes`, 14, y);
            y += 10;

            doc.line(14, y, 196, y); // Horizontal line
            y += 10;

            testData.questions.forEach((q, index) => {
                doc.setFontSize(12).setFont(undefined, 'bold');
                doc.text(`${index + 1}. ${q.question}`, 14, y);
                y += 7;

                doc.setFontSize(10).setFont(undefined, 'normal');
                if (q.options && q.options.length > 0) {
                    q.options.forEach(opt => {
                        doc.text(`- ${opt}`, 20, y);
                        y += 5;
                    }); // Corrected: Check for 'true_false' type
                } else if (q.type === 'true-false') {
                    doc.text(`- True`, 20, y);
                    y += 5;
                    doc.text(`- False`, 20, y);
                    y += 5;
                }
                y += 5; 
            });

            // 3. Save the PDF
            doc.save(`${testData.name.replace(/\s+/g, '_')}.pdf`);

        } catch (error) {
            handleError("Could not generate PDF. Please try again.");
            console.error("Error generating PDF:", error);
        }
    };

    // Opens the popup modal to display scores for a selected test.
    const handleScoreClick = (e, testId) => {
        e.stopPropagation();
        setSelectedTestId(testId);
        setShowScorePopup(true);
        setOpenMenuId(null);
    };

    // Closes the score popup modal.
    const closeScorePopup = () => {
        setShowScorePopup(false);
        setSelectedTestId(null);
    };

    // Filters and returns the scores for the currently selected test.
    const getTestScores = () => {
        if (!selectedTestId) {
            return [];
        }
        const test = createdTests.find(t => t._id === selectedTestId);
        if (test && Array.isArray(test.scores)) {
            return test.scores;
        }
    
        return [];
    };

    const scores = getTestScores();

    // Opens a popup to share the test link.
    const handleShareLink = (testId) => {
        const link = `${window.location.origin}/test/${testId}`;
        setCurrentTestLink(link);
        setShowLinkPopup(true);
    };

  return (
    <div className="mock-dash-page">
        <div className="header-wrapper">
            <Header_home/>
        </div>
        <div id="created-mocktests">
            <h1>Your Created Mock Tests</h1>
            <div id="mocktest-list">
                <div id="mocktest-items"> 
                    {isLoading ? (
                        <p>Loading your tests...</p>
                    ) : createdTests.length > 0 ? (
                        testsToShow.map(test => (
                            <div key={test._id} className="mocktest-item-container" >
                                <button onClick={() => handleShareLink(test.testId)} className="mocktest-item-btn">
                                    {test.name}
                                </button>
                                <div className="mocktest-actions">
                                    <button onClick={(e) => handleMenuToggle(e, test._id)} className="menu-toggle-btn">
                                        <MoreVertIcon />
                                    </button>
                                    {openMenuId === test._id && (
                                        <div className="actions-menu" onClick={(e) => e.stopPropagation()}>
                                            <button onClick={(e) => handleScoreClick(e, test._id)}>View Scores</button>
                                            <button onClick={() => handleDownloadPDF(test)}>Download as PDF</button>
                                            <button onClick={(e) => handleDeleteTest(test)}>Delete Test</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div id="no-mocktests">No mock tests created yet.</div>
                    )}
                    {createdTests.length > 5 && !showAll && (
                        <button onClick={() => setShowAll(true)} className="show-all-btn">
                            Show All
                        </button>
                    )}
                </div>
                <Link to="/test-creation" >
                    <button id="create-mocktest-btn">Create Mock Test</button>
                </Link>
            </div>
        </div>

        <SuccessPopup
          show={showLinkPopup}
          title="Share Your Test"
          message="Anyone with this link can take the test:"
          link={currentTestLink}
          onClose={() => setShowLinkPopup(false)}
        />
        {showScorePopup && Array.isArray(scores) && ( 
            <div className="score-popup">
                <div className="score-popup-content">
                    <span className="close-button" onClick={closeScorePopup}>&times;</span>
                    <h2>Test Scores</h2>
                    {scores.length > 0 ? (
                        <table>
                            <thead>
                                <tr><th>Student Name</th><th>Score</th></tr>
                            </thead>
                            <tbody>
                                {scores.map((score, index) => (
                                    <tr key={index}><td>{score.studentName}</td><td>{score.score}</td></tr>
                                ))}
                            </tbody>
                        </table>) : (
                        <p>No scores available for this test.</p>
                    )}
                </div>
            </div>)}
        <div className="dashboard-footer-wrapper">
            <Footer/>
        </div>
    </div>
  )
}