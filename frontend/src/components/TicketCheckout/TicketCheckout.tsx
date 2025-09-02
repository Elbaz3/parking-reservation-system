import styles from ".//TicketCheckout.module.css";

type BreakdownItem = {
  from: string;
  to: string;
  hours: number;
  rateMode: string;
  rate: number;
  amount: number;
};

type TicketData = {
  durationHours: number;
  breakdown: BreakdownItem[];
  amount: number;
};

type TData = {
  date: TicketData;
};

const TicketSummary: React.FC<TData> = (data) => {
  console.log(data);

  if (!data) {
    return;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Total Duration: {data.data.durationHours.toFixed(2)} hours
      </h2>

      <table className={styles.table}>
        <thead>
          <tr className={styles.theadRow}>
            <th className={styles.th}>From</th>
            <th className={styles.th}>To</th>
            <th className={styles.th}>Hours</th>
            <th className={styles.th}>Rate Mode</th>
            <th className={styles.th}>Rate</th>
            <th className={styles.th}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.data.breakdown.map((item, idx) => (
            <tr key={idx}>
              <td className={styles.td}>
                {new Date(item.from).toLocaleString()}
              </td>
              <td className={styles.td}>
                {new Date(item.to).toLocaleString()}
              </td>
              <td className={styles.td}>{item.hours}</td>
              <td className={styles.td}>{item.rateMode}</td>
              <td className={styles.td}>{item.rate}</td>
              <td className={styles.td}>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.total}>
        Total Amount: <span>{data.data.amount}</span>
      </div>
    </div>
  );
};

export default TicketSummary;
