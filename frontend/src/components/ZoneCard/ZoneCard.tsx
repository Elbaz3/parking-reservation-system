import styles from "./zoneCard.module.css";
import type TZone from "../../types/TZone";
import { useEffect, useState } from "react";
import Modal from "../TicketModal/TicketModal";
import { checkintTicket } from "../../services/api";
import type { TSubscriber } from "../../types/TSubscriber";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import getZones from "../../store/slices/zonesSlice/actGetZones";

type ZoneCardProps = {
  zone: TZone;
  SubscriberData?: TSubscriber;
  gateId: string | undefined;
};

interface ticketData {
  id: string;
  type: string;
  zoneId: string;
  gateId: string;
  checkinAt: string;
  checkoutAt: string | null;
}

interface postData {
  gateId: string;
  zoneId: string;
  type: "visitor" | "subscriber";
  subscriptionId?: string;
}

const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  SubscriberData,
  gateId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ticketData | null>(null);
  // get zones
  useEffect(() => {
    if (gateId) {
      dispatch(getZones(gateId));
    }
  }, [dispatch, gateId, modalOpen]);

  const ticketData: postData = {
    gateId: gateId ? gateId : "gate_1",
    zoneId: zone.id,
    type: SubscriberData?.id ? "subscriber" : "visitor",
    ...(SubscriberData?.id && { subscriptionId: SubscriberData.id }),
  };
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await checkintTicket(ticketData);
      const data: ticketData = await response.ticket;
      setModalData(data);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={zone.id}
      className={`${styles.zoneCard} ${
        !zone.open || zone.availableForVisitors <= 0 ? styles.disabled : ""
      }`}
    >
      <header className={styles.zoneHeader}>
        <h2 className={styles.zoneName}>{zone.name}</h2>
        <span className={styles.zoneCategory}>{zone.categoryId}</span>
      </header>

      <ul className={styles.zoneDetails}>
        <li>Occupied: {zone.occupied}</li>
        <li>Free: {zone.free}</li>
        <li>Reserved: {zone.reserved}</li>
        <li>Visitors Available: {zone.availableForVisitors}</li>
        <li>Subscribers Available: {zone.availableForSubscribers}</li>
        <li>Rate (Normal): {zone.rateNormal}</li>
        <li>Rate (Special): {zone.rateSpecial}</li>
      </ul>

      <div className={styles.zoneFooter}>
        <span
          className={`${styles.openStatus} ${
            zone.open ? styles.open : styles.closed
          }`}
        >
          {zone.open ? "Open" : "Closed"}
        </span>

        <button
          onClick={handleClick}
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Loading..." : "Go"}
        </button>

        {zone.rateSpecial && (
          <span className={styles.specialActive}>⭐ Special Active</span>
        )}
      </div>
      {modalOpen && modalData && (
        <Modal data={modalData} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default ZoneCard;
