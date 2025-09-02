import type TZone from "../../types/TZone";
import ZoneCard from "../../components/ZoneCard/ZoneCard";
import GateSwitcher from "../../components/GateSwitcher/GateSwitcher";
import NavTabs from "../../components/NavTabs/NavTabs";
import styles from "./gateStyle.module.css";
import useGate from "../../hooks/useGate";

function formatTime(d: Date, mode: "24h" | "12h") {
  const opts: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: mode === "12h",
  };
  return new Intl.DateTimeFormat(undefined, opts).format(d);
}

const Gate = () => {
  const {
    gateId,
    zones,
    timeFormat,
    now,
    derivedStatus,
    isSubscriber,
    setIsSubscriber,
    subscriberDate,
    setSubscriberData,
    handleSubmit,
    inputValue,
    setInputValue,
  } = useGate();

  return (
    <>
      <header className={styles.header} role="banner" aria-label="Gate header">
        <div className={styles.leftGroup}>
          <span className={styles.gateLabel} aria-label="Gate name or number">
            {gateId}
          </span>
        </div>

        <div className={styles.rightGroup}>
          <span
            className={`${styles.status} ${
              derivedStatus === "connected"
                ? styles.connected
                : derivedStatus === "connecting"
                ? styles.connecting
                : styles.disconnected
            }`}
            aria-live="polite"
            aria-label={`Connection status: ${derivedStatus}`}
          >
            <span className={styles.statusDot} aria-hidden />
            <span className={styles.statusText}>
              {derivedStatus === "connected"
                ? "Connected"
                : derivedStatus === "connecting"
                ? "Connecting…"
                : "Disconnected"}
            </span>
          </span>

          <time className={styles.time} dateTime={now.toISOString()}>
            {formatTime(now, timeFormat)}
          </time>
        </div>
      </header>
      <main>
        <NavTabs />
        <GateSwitcher />
        <div className={styles.wrapper}>
          <div className={styles.toggleContainer}>
            <span className={!isSubscriber ? styles.active : ""}>Visitor</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={isSubscriber}
                onChange={() => {
                  setIsSubscriber(!isSubscriber);
                  setSubscriberData(null);
                }}
              />
              <span className={styles.slider}></span>
            </label>
            <span className={isSubscriber ? styles.active : ""}>
              Subscriber
            </span>
          </div>

          {isSubscriber && (
            <form className={styles.box} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={"Enter the subscription id"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                Submit
              </button>
            </form>
          )}
        </div>
        {zones && !isSubscriber ? (
          <div className={styles.zonesGrid}>
            {zones.map((zone: TZone) => (
              <ZoneCard key={zone.id} zone={zone} gateId={gateId} />
            ))}
          </div>
        ) : isSubscriber && !subscriberDate ? (
          <p className={styles.message}>please put your id</p>
        ) : zones && isSubscriber && subscriberDate ? (
          <div className={styles.subscriberWrapper}>
            <div className={styles.subscriberInfo}>
              <h3 className={styles.subscriberName}>
                {subscriberDate.userName}
              </h3>
              <p
                className={
                  subscriberDate.active
                    ? styles.statusActive
                    : styles.statusInactive
                }
              >
                {subscriberDate.active ? "Active ✅" : "Inactive ❌"}
              </p>
              <p className={styles.expiry}>
                Expires:{" "}
                {new Date(subscriberDate.expiresAt).toLocaleDateString()}
              </p>
            </div>

            {subscriberDate.active && (
              <div className={styles.zonesGrid}>
                {zones.filter(
                  (zone: TZone) => zone.categoryId === subscriberDate.category
                ).length > 0 ? (
                  zones
                    .filter(
                      (zone: TZone) =>
                        zone.categoryId === subscriberDate.category
                    )
                    .map((zone: TZone) => (
                      <ZoneCard
                        key={zone.id}
                        zone={zone}
                        gateId={gateId}
                        SubscriberData={subscriberDate}
                      />
                    ))
                ) : (
                  <p className={styles.noZones}>
                    There is no available categories
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>no zones available</p>
        )}
      </main>
    </>
  );
};

export default Gate;
