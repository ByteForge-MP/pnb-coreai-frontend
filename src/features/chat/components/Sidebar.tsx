import { useState } from "react";
import "./Sidebar.css";

interface SidebarProps {
  openSettings: () => void;
}

export default function Sidebar({ openSettings }: SidebarProps) {

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

      <div className="sidebar-bottom" onClick={openSettings}>
        <span className="icon">⚙</span>
        {open && <span className="label">Settings</span>}
      </div>

    </aside>
  );
}