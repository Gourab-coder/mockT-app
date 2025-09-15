import React from "react";
import "./dashboard.css";

export default function Dashboard() {
  const tools = [
    "JPG to PDF",
    "PNG to PDF",
    "BackGround Remover",
    "MP4 to MP3",
    "PHOTO editor",
    "VIDEO editor",
  ];

  return (
    <div className="dashboard-card">
      <h2>DASHBOARD</h2>
      <div className="tool-grid">
        {tools.map((tool, index) => (
          <button key={index} className="tool">
            <div className="tool-img">🖼</div>
            <p>{tool}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
