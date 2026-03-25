import { useState } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";

export default function Dashboard() {

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={`dashboard ${theme}`}>

      <Sidebar openSettings={() => setShowDialog(true)} />

      <main className="main">

        <div className="topbar">
          <span>Welcome, USER!</span>
          <div className="avatar">U</div>
        </div>

        <div className="dashboard-content">
          <ChatContainer theme={theme} />
        </div>

      </main>

      {showDialog && (
        <div className="theme-dialog-overlay">

          <div className="theme-dialog">

            <h3>Select Theme</h3>

            <button
              onClick={() => {
                setTheme("light");
                setShowDialog(false);
              }}
            >
              Light Mode
            </button>

            <button
              onClick={() => {
                setTheme("dark");
                setShowDialog(false);
              }}
            >
              Dark Mode
            </button>

            <button onClick={() => setShowDialog(false)}>
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}