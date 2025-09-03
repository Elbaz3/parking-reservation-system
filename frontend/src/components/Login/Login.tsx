import React, { useState } from "react";
import NavTabs from "../NavTabs/NavTabs";
import { actAuth, reStateError } from "../../store/slices/auth/authSlice";
import type { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login.module.css";

interface ILogin {
  role: "employee" | "admin";
}

const Login: React.FC<ILogin> = ({ role }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

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

  if (error) {
    alert(error);
    dispatch(reStateError());
  }

  return (
    <div className={styles.container}>
      <NavTabs />
      {loading === "pending" ? (
        <p>loading...</p>
      ) : (
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
      )}
    </div>
  );
};

export default Login;
