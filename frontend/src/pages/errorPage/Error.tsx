import styles from "./Error.module.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1 className={styles.glow}>404</h1>
      <p className={styles.message}>
        Oops! The page you are looking for doesn’t exist.
      </p>
      <button className={styles.button} onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default Error;
