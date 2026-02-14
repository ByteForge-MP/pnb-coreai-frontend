import "./Dashboard.css";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";

export default function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main">

        <div className="topbar">
          <span>Welcome, MAYANK PRAKASH!</span>
          <div className="avatar">MP</div>
        </div>
         <div className="dashboard-content">
          <ChatContainer />
        </div>
      </main>

    </div>
  );
}