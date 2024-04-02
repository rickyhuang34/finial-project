import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import styles from "./ShowPage.module.css";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function ShowPage() {
  const [data, setData] = useState({});
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getShowById();
  }, []);

  async function getShowById() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/configuration",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const apiConfig = await response.json();

      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,videos`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const result = await res.json();

      setConfig({
        baseURL: apiConfig.images.secure_base_url,
        backdropSize: apiConfig.images.backdrop_sizes[2],
        posterSize: apiConfig.images.still_sizes[2],
        profileSize: apiConfig.images.profile_sizes[1],
      });

      setData(result);
    } catch (error) {
      console.log("Get show error", error);
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Skeleton
        variant="rounded"
        width={200}
        height={300}
        sx={{ bgcolor: "grey.900" }}
        style={{
          margin: "20px 50px",
          borderRadius: "8px",
        }}
      />
      <div>
        <Skeleton
          variant="text"
          width={450}
          height={50}
          sx={{ bgcolor: "grey.900" }}
          style={{
            margin: "10px",
            borderRadius: "8px",
          }}
        />
        <Skeleton
          variant="text"
          width={370}
          height={50}
          sx={{ bgcolor: "grey.900" }}
          style={{
            margin: "10px",
            borderRadius: "8px",
          }}
        />
        <Skeleton
          variant="text"
          width={80}
          height={20}
          sx={{ bgcolor: "grey.900" }}
          style={{
            margin: "10px",
            borderRadius: "8px",
          }}
        />
        <Skeleton
          variant="text"
          width={160}
          height={20}
          sx={{ bgcolor: "grey.900" }}
          style={{
            margin: "10px",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  ) : (
    <>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: `url(${config.baseURL}${config.backdropSize}${data.backdrop_path})`,
        }}
      >
        <div className={styles.wrapper}>
          <img
            style={{
              width: "auto",
              height: "300px",
              margin: "20px 50px",
              borderRadius: "8px",
              boxShadow: "-5px 5px 10px black",
            }}
            src={`${config.baseURL}${config.posterSize}${data.poster_path}`}
            alt={data.name}
          />
          <div style={{ marginTop: "20px" }}>
            <h2 className={styles.name}>{data.name}</h2>
            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
              ({data.first_air_date})
            </p>
            {data.genres &&
              data.genres.map((genre) => {
                return (
                  <span key={genre.id} className={styles.genre}>
                    &#x2022; {genre.name}
                  </span>
                );
              })}
            <hr style={{ width: "300px" }} />

            <p className={styles.overview}>{data.overview}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* <span>Status: {data.status}</span> */}
            </div>
            <p>Seasons: {data.number_of_seasons}</p>
            <p> Episodes: {data.number_of_episodes}</p>

            {data.credits &&
              data.credits.crew.map((ppl) => {
                return (
                  <div>
                    <span>
                      {ppl.job === "Creator" ? `${ppl.job}: ${ppl.name}` : null}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className={styles.castContainer}>
        <h2 className={styles.castHeader}>CAST</h2>
        {data.credits &&
          data.credits.cast.map((el, index) => {
            if (index >= 0 && index < 6) {
              return (
                <div key={el.id} className={styles.cast}>
                  <img
                    className={styles.profilePic}
                    src={`${config.baseURL}${config.profileSize}${el.profile_path}`}
                    alt={el.name}
                    key={el.id}
                  />
                  <p
                    style={{ color: "black", padding: "5px", fontSize: "14px" }}
                  >
                    {el.name}
                  </p>
                  <p
                    style={{
                      padding: "2px",
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    Role: {el.character}
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}
        <div class={styles.moreDiv}>
          <button className={styles.moreBtn}>More➡️</button>
        </div>
      </div>
    </>
  );
}
