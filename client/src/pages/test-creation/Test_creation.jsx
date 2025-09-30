import React, { useState } from "react";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import "./Test_creation.css";

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

  // Handle number of questions change
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

  // Handle question field changes
  const handleQuestionChange = (idx, field, value) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === idx ? { ...q, [field]: value } : q
      )
    );
  };

  // Handle option changes
  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, options: q.options.map((opt, oi) => (oi === optIdx ? value : opt)) }
          : q
      )
    );
  };

  // Handle question type change
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

  // Handle form submit (for demonstration)
  const handleSubmit = (e) => {
    e.preventDefault();

    const testData = {
        name: testName,
        description: testDescription,
        timeLimit: testTime,
        numberOfQuestions: numberOfQuestions,
        questions: questions
    };
    console.log("Test Created:", testData);
    alert("Test Created!");
  };

  return (
    <div>
      <header id="header-test">
        <div id="head1">
          <h1 id="name">mockT</h1>
          <p>test creation</p>
        </div>
        <div>
          <AccountCircleTwoToneIcon style={{ fontSize: "40px", color: "#c4bcbc" }} />
        </div>
      </header>

      <div id="test-creation-page">
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