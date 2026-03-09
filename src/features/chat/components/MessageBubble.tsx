import ReactMarkdown from "react-markdown";
import { Message } from "../types/chat";
import { jsPDF } from "jspdf";
import { useState,useRef } from "react";

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

  const videoRef = useRef<HTMLVideoElement>(null);
  const [clicked, setClicked] = useState(false);
  const isUser = message.role === "user";

  const isThinking =
    message.role === "assistant" &&
    message.streaming &&
    message.content.trim() === "";

  // const isStreamingText =
  //   message.role === "assistant" &&
  //   message.streaming &&
  //   message.content.trim() !== "";

  const [chartData, setChartData] = useState<any>(null);
  const [showChart, setShowChart] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ---------------------------------------------------
  // Load voices safely (important for production)
  // ---------------------------------------------------

  const loadVoices = () => {

    return new Promise<SpeechSynthesisVoice[]>((resolve) => {

      let voices = speechSynthesis.getVoices();

      if (voices.length) {
        resolve(voices);
      } else {
        speechSynthesis.onvoiceschanged = () => {
          resolve(speechSynthesis.getVoices());
        };
      }

    });

  };

  // ---------------------------------------------------
  // Speak Text (Female Voice)
  // ---------------------------------------------------

  const speakText = async () => {

    if (!("speechSynthesis" in window)) {
      alert("Speech not supported in this browser");
      return;
    }

    speechSynthesis.cancel();

    const voices = await loadVoices();

    const femaleVoice =
      voices.find(v => v.name.includes("Google UK English Female")) ||
      voices.find(v => v.name.includes("Female")) ||
      voices.find(v => v.name.includes("Google")) ||
      voices[0];

    const utterance = new SpeechSynthesisUtterance(message.content);

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.2;
    utterance.lang = "en-US";

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);

  };

  // ---------------------------------------------------
  // Extract JSON for chart
  // ---------------------------------------------------

  const extractJSON = (text: string) => {

    const match = text.match(/\{[\s\S]*\}/);

    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }

  };

  // ---------------------------------------------------
  // Download PDF
  // ---------------------------------------------------

  const downloadPDF = () => {

    setClicked(true)

    setTimeout(() => {
      setClicked(false);
    }, 5000);

    const doc = new jsPDF();

    const lines = doc.splitTextToSize(message.content, 180);

    doc.text(lines, 10, 10);

    doc.save("response.pdf");

  };

  // ---------------------------------------------------
  // Generate Chart
  // ---------------------------------------------------

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

        {/* Assistant Avatar while speaking */}

        {!isUser && isSpeaking && (
    <>
      {/* <img
        className="assistant-avatar"
        src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
        alt="assistant"
      /> */}

      <div className="assistant-avatar">

        <video
          ref={videoRef}
          width="70"
          height="70"
          muted
          autoPlay
          loop
          playsInline
        >
          <source
            src="../../src/assets/girl-avatar.mp4"
            type="video/mp4"
          />
        </video>

      </div>
    </>
  )}

        {/* THINKING */}

        {isThinking && (

          <div className="bubble thinking">

            <span className="thinking-text">
              Thinking
            </span>

            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>

          </div>

        )}

        {/* STREAMING TEXT */}

        {isThinking && (

          <div className="bubble">

            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>

          </div>

        )}

        {/* FINAL MESSAGE */}

        {!message.streaming && (

          <>

            <div className="bubble">

              {isUser ? (
                message.content
              ) : (
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              )}

            </div>

            {!isUser && (

              <div className="message-actions">

                <button className="icon-btn">
                  <img width={15} height={15} src="../../src/assets/like.svg" />
                </button>

                <button className="icon-btn">
                  <img width={15} height={15} src="../../src/assets/dislike.svg" />
                </button>

                <button
                  className="icon-btn"
                  onClick={downloadPDF}
                >
                <img 
                width={15} 
                height={15} 
                src={clicked ? "../../src/assets/download_anime.svg" : "../../src/assets/download.svg"}
                />
                </button>

                <button
                  className="icon-btn"
                  onClick={generateChart}
                >
                <img width={15} height={15} src="../../src/assets/chart.svg" />
                </button>

                <button
                  className="icon-btn"
                  onClick={speakText}
                >
                <img width={15} height={15} src="../../src/assets/voice.svg" />
                </button>

              </div>

            )}

          </>

        )}

      </div>

      {/* Chart Modal */}

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