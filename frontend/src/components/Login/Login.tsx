import React, { useState } from "react";
import NavTabs from "../NavTabs/NavTabs";
import { actAuth } from "../../store/slices/auth/authSlice";
import type { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import styles from "./login.module.css";

interface ILogin {
  role: "employee" | "admin";
}

const Login: React.FC<ILogin> = ({ role }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(
        actAuth({
          username,
          password,
          role,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <NavTabs />
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
