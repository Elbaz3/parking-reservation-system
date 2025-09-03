import NavTabs from "../../components/NavTabs/NavTabs";
import Login from "../../components/Login/Login";

import styles from "./adminStyle.module.css";
import useAdmin from "../../hooks/useAdmin";

const Admin = () => {
  const {
    token,
    zones,
    subs,
    categoryId,
    handleAddRushHour,
    handleAddVacation,
    handleToggleZone,
    handleUpdateRates,
    setCategoryId,
    zLoading,
    subLoading,
    toglleLoading,
    role,
  } = useAdmin();

  if (!token || role != "admin") {
    return (
      <div>
        <Login role="admin" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <NavTabs />
      <div className={styles.adminDashboard}>
        {subLoading ? (
          <p>loading...</p>
        ) : (
          <div className={styles.employees}>
            <h2>Subscribers</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Active</th>
                  <th>from</th>
                  <th>to</th>
                  <th>category</th>
                  <th>cars</th>
                </tr>
              </thead>
              <tbody>
                {subs.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.userName}</td>
                    <td>{sub.active ? "yes" : "no"}</td>
                    <td>{new Date(sub.startsAt).toLocaleString()}</td>
                    <td>{new Date(sub.expiresAt).toLocaleString()}</td>
                    <td>{sub.category}</td>
                    <td>
                      {sub.cars.map((car, i) => (
                        <span key={i}>{car.model} </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {zLoading ? (
          <p>loading...</p>
        ) : (
          <div className={styles.zones}>
            <h2>Zones</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Occupied</th>
                  <th>Free</th>
                  <th>Reserved</th>
                  <th>Visitors Available</th>
                  <th>Subscribers Available</th>
                  <th>state</th>
                  <th>ِAction</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((zone) => (
                  <tr key={zone.zoneId}>
                    <td>{zone.name}</td>
                    <td>{zone.occupied}</td>
                    <td>{zone.free}</td>
                    <td>{zone.reserved}</td>
                    <td>{zone.availableForVisitors}</td>
                    <td>{zone.availableForSubscribers}</td>
                    <td>{zone.open ? "open" : "closed"}</td>
                    <td>
                      <button
                        onClick={() => handleToggleZone(zone.zoneId, zone.open)}
                        className={zone.open ? styles.close : styles.open}
                      >
                        {zone.open ? "close" : "open"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Control Panel */}
        <div className={styles.settings}>
          <h1 className={styles.title}>Admin Settings</h1>

          <div className={styles.settingContainer}>
            {/* ✅ Update Category Rates */}
            <section className={styles.section}>
              <h2 className={styles.subtitle}>Update Category Rates</h2>
              <form onSubmit={handleUpdateRates} className={styles.form}>
                <label className={styles.label}>
                  Category:
                  <select
                    className={styles.select}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">-- Select a category --</option>
                    <option value="cat_premium">Premium</option>
                    <option value="cat_regular">Regular</option>
                    <option value="cat_economy">Economy</option>
                    <option value="cat_vip">VIP</option>
                  </select>
                </label>

                <label className={styles.label}>
                  Normal Rate:
                  <input
                    className={styles.input}
                    type="number"
                    name="rateNormal"
                    step="0.01"
                  />
                </label>

                <label className={styles.label}>
                  Special Rate:
                  <input
                    className={styles.input}
                    type="number"
                    name="rateSpecial"
                    step="0.01"
                  />
                </label>

                <button className={styles.addAct} type="submit">
                  Save Rates
                </button>
              </form>
            </section>

            {/* ✅ Add Rush Hour */}
            <section className={styles.section}>
              <h2 className={styles.subtitle}>Add Rush Hour</h2>
              <form onSubmit={handleAddRushHour} className={styles.form}>
                <label className={styles.label}>
                  Start:
                  <input
                    className={styles.input}
                    type="datetime-local"
                    name="start"
                  />
                </label>

                <label className={styles.label}>
                  End:
                  <input
                    className={styles.input}
                    type="datetime-local"
                    name="end"
                  />
                </label>

                <button className={styles.addAct} type="submit">
                  Add Rush Hour
                </button>
              </form>
            </section>

            {/* ✅ Add Vacation */}
            <section className={styles.section}>
              <h2 className={styles.subtitle}>Add Vacation</h2>
              <form onSubmit={handleAddVacation} className={styles.form}>
                <label className={styles.label}>
                  Start:
                  <input className={styles.input} type="date" name="start" />
                </label>

                <label className={styles.label}>
                  End:
                  <input className={styles.input} type="date" name="end" />
                </label>

                <button className={styles.addAct} type="submit">
                  Add Vacation
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
