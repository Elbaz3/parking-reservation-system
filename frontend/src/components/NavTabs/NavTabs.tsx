import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavTabs.module.css";

const NavTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "Gate", path: "/gate/gate_1" },
    { label: "Checkpoint", path: "/checkpoint" },
    { label: "Admin", path: "/admin" },
  ];

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab.path}
          className={`${styles.tab} ${
            location.pathname.slice(0, 4) === tab.path.slice(0, 4)
              ? styles.active
              : ""
          }`}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavTabs;
