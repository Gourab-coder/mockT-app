import React, { useState, useEffect } from "react";
import "./Test_taking.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header_home from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Test_taking () {
    const [startTest, setStartTest] = useState(false);
    const [testData, setTestData] = useState({});
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [finalScore, setFinalScore] = useState(0);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1200); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [stdName, setStdName] = useState(false);
    const [studentName, setStudentName] = useState("");
    const navigate = useNavigate();
    const { testId } = useParams(); 

    console.log(testId);

    // Fetches the test data from the API based on the testId from the URL
    const fetchTest = async () => {
        if (!testId) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:1001/enquiry/test/${testId}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Test not found.");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTestData(data);
            console.log(data);
            setQuestions(data.questions || []); 
            setUserAnswers(new Array(data.questions.length).fill(""));
            setTimeLeft(data.timeLimit * 60);
            setError(null);
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch the test data when the component mounts or testId changes
    useEffect(() => {
        fetchTest();
    }, [testId]);

    // Effect to handle the countdown timer once the test starts
    useEffect(() => {
        if (!startTest || isTestFinished) {
            return; 
        }

        if (timeLeft <= 0) {
            handleSubmit(); 
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId); // Cleanup on unmount or re-render
    }, [startTest, isTestFinished, timeLeft]);


    // Sets the state to begin the test
    function handleStartTest() {
        setStartTest(true);
    }

    // Navigates to the previous question
    function handlePreviousQuestion() {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    // Navigates to the next question
    function handleNextQuestion() {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
        console.log(questions[currentQuestion].type);
        console.log(questions[currentQuestion].answer);
        console.log(questions[currentQuestion].options);
    }

    // Updates the user's answer for the current question
    function handleAnswerChange(value) {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = value;
        setUserAnswers(newAnswers);
    }

    // Calculates the final score, saves it to the DB, and ends the test
    function handleSubmit() {
        let calculatedScore = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].type === 'short-answer') {
                if (userAnswers[i].toLowerCase() === questions[i].answer.toLowerCase()) {
                    calculatedScore++;
                }
            } else if (userAnswers[i] === questions[i].answer) {
                calculatedScore++;
            }
        }
        setFinalScore(calculatedScore);
        setScoreInDB(calculatedScore);
        setIsTestFinished(true);
    }

    // Saves the final score to the database
    const setScoreInDB = async (scoreToSave) => {
        let scoreData = {
            testId: testId,
            studentName: studentName,
            score: scoreToSave 
        }
        console.log(scoreData);
        try {
            const url = `http://localhost:1001/enquiry/test-score`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(scoreData)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Server responded with ${response.status}`);
            }
            const result = await response.text();
            console.log("Test Created:", result);
        } catch (error) {
            console.error("Error creating test:", error);
            alert(`Failed to create test: ${error.message}`);
        }   
    }

    // Formats the remaining time from seconds to a MM:SS string
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    // Handles the submission of the student's name before the test starts
    const handleStdNameSubmit = () => {
        setStdName(true);
        console.log(studentName);
    }
    
    


    return (
        <div className="test-taking-page">
            <div className="header-wrapper">
                <Header_home/>
            </div>
            <div className="test-container">
                <h1 className="test-title">
                    {loading && 'Loading Test...'}
                    {!loading && error && `Error: ${error}`}
                    {!loading && !error && testData?.name && testData.name}
                    {!loading && !error && !testData?.name && 'Test not found.'}
                </h1>
                <div className="test-body">
                    {stdName === false && (
                        <div className="student-name-prompt">
                            <input type="text" placeholder="type your name" className="name-input" onChange={(e) => setStudentName(e.target.value)} />
                            <button className="name-submit-btn" onClick={handleStdNameSubmit}>submit</button>
                        </div>
                    )}
                    {stdName &&!loading && !error && testData && startTest === false && (
                        <div className="start-test">
                            <button className="test-start-btn" onClick={handleStartTest}>start test</button>
                        </div>
                    )}
                    {isTestFinished && (
                        <div className="test-results">
                            <h2>Test Finished!</h2>
                            <p>Your Score: {finalScore} / {questions.length}</p>
                            <button className="test-end-btn" onClick={() => navigate('/')}>Test End</button>
                        </div>
                    )}
                    {startTest && !isTestFinished && testData && (
                        <div className="test-content">
                            <div className="timer-display">
                                Time Left: {formatTime(timeLeft)}
                            </div>
                            <div className="questions-container">
                                {questions.length > 0 ? (
                                    <div className="question-card">{questions[currentQuestion].question}</div>
                                ) : "No questions available."}
                                <div className="options-card">
                                    {questions[currentQuestion].type === "multiple-choice" &&
                                        questions[currentQuestion].options.map((option, index) => (
                                            <div key={index} className="option">
                                                <input
                                                    type="radio"
                                                    id={`q${currentQuestion}-opt${index}`}
                                                    name={`question-${currentQuestion}`}
                                                    value={option}
                                                    checked={userAnswers[currentQuestion] === option}
                                                    onChange={(e) => handleAnswerChange(e.target.value)}
                                                />
                                                <label htmlFor={`q${currentQuestion}-opt${index}`}>{option}</label>
                                            </div>
                                        ))
                                    }
                                    {questions[currentQuestion].type === "true-false" &&
                                        ["True", "False"].map((option, index) => (
                                            <div key={index} className="option">
                                                <input
                                                    type="radio"
                                                    id={`q${currentQuestion}-opt${index}`}
                                                    name={`question-${currentQuestion}`}
                                                    value={option}
                                                    checked={userAnswers[currentQuestion] === option}
                                                    onChange={(e) => handleAnswerChange(e.target.value)}
                                                />
                                                <label htmlFor={`q${currentQuestion}-opt${index}`}>{option}</label>
                                            </div>
                                        ))
                                    }
                                    {questions[currentQuestion].type === "short-answer" &&
                                        <div className="option">
                                            <input
                                                type="text"
                                                className="short-answer-input"
                                                placeholder="Type your answer here..."
                                                value={userAnswers[currentQuestion] || ''}
                                                onChange={(e) => handleAnswerChange(e.target.value)}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="test-navigation">
                                <button className="qes-prev-btn" onClick={handlePreviousQuestion}>previous</button>
                                {currentQuestion < questions.length - 1 ? (
                                    <button className="qes-next-btn" onClick={handleNextQuestion}>next</button>
                                ) : (
                                    <button className="qes-submit-btn" onClick={handleSubmit}>Submit Test</button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}