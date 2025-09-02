import React from "react";
import styles from "./Modal.module.css";

interface SubscriberData {
  id: string;
  type: string;
  zoneId: string;
  gateId: string;
  checkinAt: string;
  checkoutAt: string | null;
}

interface ModalProps {
  data: SubscriberData;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <h2>Subscriber Data</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `);
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>Ticket Info</h2>
        <div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>ID:</span> {data.id}
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Type:</span> {data.type}
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Zone ID:</span> {data.zoneId}
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Gate ID:</span> {data.gateId}
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Check-in:</span>{" "}
            {new Date(data.checkinAt).toLocaleString()}
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>Check-out:</span>{" "}
            {data.checkoutAt
              ? new Date(data.checkoutAt).toLocaleString()
              : "Not checked out"}
          </div>
        </div>

        <button className={styles.printButton} onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default Modal;
