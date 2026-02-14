import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>

      <div className="sidebar-top">

        <img
          src="/pnb_logo.png"
          className="sidebar-logo"
          onClick={() => setOpen(!open)}
        />

      </div>

      <div className="sidebar-bottom">
        <span className="icon">⚙</span>
        {open && <span className="label">Settings</span>}
      </div>

    </aside>
  );
}