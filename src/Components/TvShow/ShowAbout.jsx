import styles from "../Styles/ShowAbout.module.css";
import defaultImg from "../Images/defaultImg.jpg";
import React from "react";

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
        <h3>Top Cast</h3>
        <div className={styles.castContainer}>
          {data.credits &&
            data.credits.cast.slice(0, 10).map((ppl) => (
              <React.Fragment key={ppl.id}>
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
              </React.Fragment>
            ))}
        </div>
      </div>

      <ul className={styles.stats} key="stats">
        <li key="stats-1">
          <strong>Status</strong>
          <br />
          {data && data.status}
        </li>

        <li key="stats-2">
          <strong>Last Air Date</strong>
          <br />
          {data && new Date(data.last_air_date).toLocaleDateString("en-US")}
        </li>
        {data && data.created_by && data.created_by.length > 0 ? (
          <li key="stats-3">
            <strong>Created By</strong>
            <br />
            {data &&
              data.created_by &&
              data.created_by.map((el, index) => (
                <React.Fragment key={`created-by-${index}`}>
                  {el.name}
                  <br />
                </React.Fragment>
              ))}
          </li>
        ) : null}
      </ul>
    </div>
  );
}
