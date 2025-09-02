import styles from "./checkPoint.module.css";
import NavTabs from "../../components/NavTabs/NavTabs";
import Login from "../../components/Login/Login";
import useCheckpoint from "../../hooks/useCheckpoint";
import TicketSummary from "../../components/TicketCheckout/TicketCheckout";

const TicketPage: React.FC = () => {
  const {
    token,
    ticketId,
    setTicketId,
    handleShow,
    loading,
    handleChickout,
    showT,
    response,
    checkoutRes,
    error,
  } = useCheckpoint();

  if (!token) {
    return <Login role="employee" />;
  }

  return (
    <div className={styles.container}>
      <NavTabs />
      <label>show ticket</label>
      <input
        type="text"
        placeholder="Enter Ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        className={styles.input}
      />
      <div className={styles.btns}>
        {" "}
        <button
          className={styles.button}
          onClick={handleShow}
          disabled={loading}
        >
          show
        </button>
        <button
          className={styles.button}
          onClick={handleChickout}
          disabled={loading}
        >
          checkout
        </button>
      </div>

      {showT === "show" ? (
        <div className={styles.list}>
          {error ? (
            <div>{error}</div>
          ) : (
            <div className={styles.card}>
              <p>
                <strong>ID:</strong> {response?.id}
              </p>
              <p>
                <strong>Type:</strong> {response?.type}
              </p>
              <p>
                <strong>Zone:</strong> {response?.zoneId}
              </p>
              <p>
                <strong>Gate:</strong> {response?.gateId}
              </p>
              <p>
                <strong>Check-in:</strong>{" "}
                {response?.checkinAt
                  ? new Date(response?.checkinAt).toLocaleString()
                  : "—"}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {response?.checkoutAt
                  ? new Date(response?.checkoutAt).toLocaleString()
                  : "—"}
              </p>
            </div>
          )}
        </div>
      ) : showT === "checkout" && error ? (
        <div>{error}</div>
      ) : showT === "checkout" && !error ? (
        <TicketSummary data={checkoutRes} />
      ) : (
        ""
      )}
    </div>
  );
};

export default TicketPage;
