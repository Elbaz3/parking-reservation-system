import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavTabs.module.css";
import type { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slices/auth/authSlice";

const NavTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.user?.token);

  const tabs = [
    { label: "Gate", path: "/gate/gate_1" },
    { label: "Checkpoint", path: "/checkpoint" },
    { label: "Admin", path: "/admin" },
  ];
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(removeUser());
  };

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
      {token && (
        <button onClick={handleLogout} className={styles.tab && styles.logout}>
          logout
        </button>
      )}
    </div>
  );
};

export default NavTabs;
