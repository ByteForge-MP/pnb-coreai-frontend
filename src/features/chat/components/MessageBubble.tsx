import ReactMarkdown from "react-markdown";
import { Message } from "../types/chat";
import { jsPDF } from "jspdf";
import { useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

import "./MessageBubble.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MessageBubble({ message }: { message: Message }) {

  const isUser = message.role === "user";

  /* Detect thinking state */

  const isThinking =
    message.role === "assistant" &&
    message.content.trim() === "";

  const [chartData, setChartData] = useState<any>(null);
  const [showChart, setShowChart] = useState(false);

  /* Extract JSON from response */

  const extractJSON = (text: string) => {

    const match = text.match(/\{[\s\S]*\}/);

    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }

  };

  /* Download PDF */

  const downloadPDF = () => {

    const doc = new jsPDF();

    const lines = doc.splitTextToSize(message.content, 180);

    doc.text(lines, 10, 10);

    doc.save("response.pdf");

  };

  /* Generate chart */

  const generateChart = () => {

    const json = extractJSON(message.content);

    if (!json) {
      alert("Chart data not found.");
      return;
    }

    const formattedData = {
      labels: json.labels,
      datasets: json.datasets
    };

    setChartData(formattedData);
    setShowChart(true);

  };

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>

      <div className="message-wrapper">

        {/* THINKING STATE */}

        {isThinking ? (

          <div className="bubble thinking">
            <span className="thinking-text">Thinking</span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

        ) : (

          <>
            {/* NORMAL MESSAGE */}

            <div className="bubble">

              {isUser ? (
                message.content
              ) : (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              )}

            </div>

            {/* ACTION ICONS */}

            {!isUser && message.content.trim() !== "" && (

              <div className="message-actions">

                <button
                  className="icon-btn"
                  onClick={downloadPDF}
                  title="Download"
                >
                  ⬇️
                </button>

                <button
                  className="icon-btn"
                  onClick={generateChart}
                  title="Generate Chart"
                >
                  📊
                </button>

              </div>

            )}

          </>

        )}

      </div>

      {/* CHART POPUP */}

      {showChart && chartData && (

        <div
          className="chart-overlay"
          onClick={() => setShowChart(false)}
        >

          <div
            className="chart-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="chart-close"
              onClick={() => setShowChart(false)}
            >
              Close
            </button>

            <Bar
              data={chartData}
              options={{ responsive: true }}
            />

          </div>

        </div>

      )}

    </div>
  );
}