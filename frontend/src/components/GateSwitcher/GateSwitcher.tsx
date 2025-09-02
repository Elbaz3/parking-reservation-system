import { useNavigate, useParams } from "react-router-dom";
import styles from "./GateSwitcher.module.css";

const gates = ["gate_1", "gate_2", "gate_3", "gate_4", "gate_5"];

const GateSwitcher = () => {
  const navigate = useNavigate();
  const { gateId } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/gate/${e.target.value}`);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="gate-select" className={styles.label}>
        Select Gate:
      </label>
      <select
        id="gate-select"
        value={gateId || "gate_1"}
        onChange={handleChange}
        className={styles.select}
      >
        {gates.map((g) => (
          <option key={g} value={g}>
            {g.replace("_", " ").toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GateSwitcher;
