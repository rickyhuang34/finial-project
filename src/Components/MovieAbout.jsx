import styles from "./Styles/MovieAbout.module.css";
import defaultImg from "./Images/defaultImg.jpg";

export default function MovieAbout({ data, config }) {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
        }}
      >
        <h3 key="castheader">CAST</h3>
        <div className={styles.castContainer}>
          {data.credits &&
            data.credits.cast.slice(0, 10).map((ppl) => {
              return (
                <>
                  {ppl.profile_path === null ? (
                    <div className={styles.castCard}>
                      <img
                        key={ppl.id}
                        src={`${defaultImg}`}
                        alt={ppl.name}
                        style={{
                          width: "120px",
                          height: "180px",
                          objectFit: "cover",
                        }}
                      />
                      <p>{ppl.name}</p>
                    </div>
                  ) : (
                    <div className={styles.castCard}>
                      <img
                        key={ppl.id}
                        src={`${config.baseURL}${config.posterSize}${ppl.profile_path}`}
                        alt={ppl.name}
                        style={{ width: "120px", height: "180px" }}
                      />
                      <p>{ppl.name}</p>
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </div>

      <ul className={styles.stats}>
        <li key="status">
          <strong>Status</strong>
          <br />
          {data && data.status}
        </li>

        <li key="budget">
          <strong>Budget</strong>
          <br />
          {data && data.budget > 0
            ? "$" +
              data.budget.toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })
            : "-"}
        </li>
        <li key="revenue">
          <strong>Revenue</strong>
          <br />
          {data && data.revenue > 0
            ? "$" +
              data.revenue.toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })
            : "-"}
        </li>
      </ul>
    </div>
  );
}
