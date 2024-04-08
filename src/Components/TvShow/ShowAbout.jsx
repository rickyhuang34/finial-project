import styles from "../Styles/ShowAbout.module.css";
import defaultImg from "../Images/defaultImg.jpg";

export default function ShowAbout({ data, config }) {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
        }}
      >
        <h3 key="castheader">Cast</h3>
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

        <li key="lastairdate">
          <strong>Last Air Date</strong>
          <br />
          {data && new Date(data.last_air_date).toLocaleDateString("en-US")}
        </li>
        <li key="createdby">
          <strong>Created By</strong>
          <br />
          {data &&
            data.created_by &&
            data.created_by.map((el) => {
              return <li>{el.name}</li>;
            })}
        </li>
      </ul>
    </div>
  );
}
