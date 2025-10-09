import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Test_creation.css";
import SuccessPopup from "./SuccessPopup";
import Header_home from "../../components/Header/Header";

export default function Test_creation() {
  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [testTime, setTestTime] = useState(20);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [questions, setQuestions] = useState(
    Array.from({ length: 5 }, () => ({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      answer: ""
    }))
  );
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [createdTestLink, setCreatedTestLink] = useState("");
  const navigate = useNavigate();

  // Resets the questions array when the total number of questions is changed.
  const handleNumberOfQuestionsChange = (e) => {
    const num = parseInt(e.target.value, 10) || 0;
    setNumberOfQuestions(num);
    setQuestions(Array.from({ length: num }, () => ({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      answer: ""
    })));
  };

  // Updates a specific field (like 'question' or 'answer') for a given question.
  const handleQuestionChange = (idx, field, value) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === idx ? { ...q, [field]: value } : q
      )
    );
  };

  // Updates the text of a specific option for a multiple-choice question.
  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, options: q.options.map((opt, oi) => (oi === optIdx ? value : opt)) }
          : q
      )
    );
  };

  // Handles changing a question's type and resets its options/answer structure.
  const handleTypeChange = (idx, value) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === idx
          ? {
              ...q,
              type: value,
              options: value === "multiple-choice" ? ["", "", "", ""] : [],
              answer: ""
            }
          : q
      )
    );
  };

  // Gathers all test data, generates a unique test ID, and sends it to the backend.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate the 10-digit test ID
    const questionsPart = String(numberOfQuestions).padStart(2, '0');
    const timePart = String(testTime).padStart(2, '0');
    const randomPart = String(Math.floor(Math.random() * 100000) + 1).padStart(6, '0');
    const generatedTestId = `${questionsPart}${timePart}${randomPart}`;

    const testData = {
      name: testName,
      description: testDescription,
      timeLimit: testTime,
      numberOfQuestions: numberOfQuestions,
      questions: questions,
      testId: generatedTestId
    };

    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        alert("Authentication Error: You must be logged in to create a test.");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/enquiry/test-creation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add the Authorization header
        },
        body: JSON.stringify(testData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Server responded with ${response.status}`);
      }

      const result = await response.text();
      console.log("Test Created:", result);
      const testLink = `https://mockt.vercel.app/test/${testData.testId}`;
      setCreatedTestLink(testLink);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error creating test:", error);
      alert(`Failed to create test: ${error.message}`);
    }
  };

  return (
    <div>
      <Header_home />
      <div id="test-creation-page">
        <SuccessPopup
          show={showSuccessPopup}
          title="Test Created Successfully!"
          message="Share this link with participants:"
          link={createdTestLink}
          onClose={() => setShowSuccessPopup(false)}
        />
        <h1>Welcome to mockT</h1>
        <div id="test-creation-details">
            <form onSubmit={handleSubmit}>
                <label htmlFor="test-name">Test Name:</label>
                <input 
                    type="text" 
                    id="test-name" 
                    name="test-name" 
                    required 
                    value={testName}
                    onChange={e => setTestName(e.target.value)}
                />

                <label htmlFor="test-description">Description:</label>
                <textarea 
                    id="test-description" 
                    name="test-description" 
                    required
                    value={testDescription}
                    onChange={e => setTestDescription(e.target.value)}
                ></textarea>

                <label htmlFor="test-time">Time Limit:</label>
                <select
                    id="test-time"
                    name="test-time"
                    required
                    value={testTime}
                    onChange={e => setTestTime(Number(e.target.value))}
                >
                    <option value="">Select time</option>
                    <option value="20">20 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                </select>

                <label htmlFor="number-of-questions">Number of Questions:</label>
                <select
                    name="number-of-questions"
                    id="number-of-questions"
                    required
                    value={numberOfQuestions}
                    onChange={handleNumberOfQuestionsChange}
                >
                    <option value="">Select number of questions</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                </select>

                <div id="test-questions">
                    {questions.map((q, idx) => (
                        <div key={idx} className="question-block">
                        <label>Question {idx + 1} Type:</label>
                        <select
                            value={q.type}
                            onChange={e => handleTypeChange(idx, e.target.value)}
                        >
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="short-answer">Short Answer</option>
                            <option value="true-false">True/False</option>
                        </select>

                        <label>Question:</label>
                        <input
                            type="text"
                            value={q.question}
                            onChange={e => handleQuestionChange(idx, "question", e.target.value)}
                            required
                        />

                        {q.type === "multiple-choice" && (
                            <>
                            <label>Options:</label>
                            {q.options.map((opt, optIdx) => (
                                <input
                                key={optIdx}
                                type="text"
                                value={opt}
                                placeholder={`Option ${optIdx + 1}`}
                                onChange={e => handleOptionChange(idx, optIdx, e.target.value)}
                                required
                                />
                            ))}
                            </>
                        )}

                        {q.type === "true-false" && (
                            <>
                            <label>Answer:</label>
                            <select
                                value={q.answer}
                                onChange={e => handleQuestionChange(idx, "answer", e.target.value)}
                                required
                            >
                                <option value="">Select answer</option>
                                <option value="True">True</option>
                                <option value="False">False</option>
                            </select>
                            </>
                        )}

                        {q.type === "short-answer" && (
                            <>
                            <label>Answer:</label>
                            <input
                                type="text"
                                value={q.answer}
                                onChange={e => handleQuestionChange(idx, "answer", e.target.value)}
                                required
                            />
                            </>
                        )}

                        {q.type === "multiple-choice" && (
                            <>
                            <label>Correct Option (Answer):</label>
                            <input
                                type="text"
                                value={q.answer}
                                onChange={e => handleQuestionChange(idx, "answer", e.target.value)}
                                placeholder="Enter correct option text"
                                required
                            />
                            </>
                        )}

                        <hr />
                        </div>
                    ))}
                </div>

                <button type="submit">Create Test</button>
            </form>
        </div>
      </div>
    </div>
  );
}