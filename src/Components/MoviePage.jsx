import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import styles from "./MoviePage.module.css";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function MoviePage() {
  const [data, setData] = useState({});
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getMovieById();
  }, []);

  async function getMovieById() {
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
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos`,
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
      });

      setData(result);

      let youtubeVids = Object.values(result.videos.results);
      setTrailers(youtubeVids);
    } catch (error) {
      console.log("Get movie error", error);
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
            alt={data.title}
          />
          <div style={{ marginTop: "20px" }}>
            <h2 className={styles.title}>{data.title}</h2>
            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
              ({data.release_date})
            </p>
            {data.genres &&
              data.genres.map((genre) => {
                return (
                  <span key={genre.id} className={styles.genre}>
                    {genre.name}
                  </span>
                );
              })}
            <hr style={{ width: "300px" }} />

            <p className={styles.tagline}>{data.tagline}</p>
            <p className={styles.overview}>{data.overview}</p>
            {/* <div style={{ display: "flex", gap: "10px" }}> */}
            {/* <span className={styles.status}>Status: {data.status}</span> */}
            <p className={styles.time}>
              &#128338; {Math.floor(data.runtime / 60)}h{data.runtime % 60}m
            </p>
            {/* </div> */}

            {data.credits &&
              data.credits.crew.map((ppl) => {
                return (
                  <div>
                    <span>
                      {ppl.job === "Director"
                        ? `${ppl.job}: ${ppl.name}`
                        : null}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* <div className={styles["video-container"]}>
        <h1 className={styles.videoHeader}>Videos</h1>
        <div className={styles["video-wrapper"]}>
          {data &&
            trailers.map((el) => {
              return (
                <iframe
                  width="520"
                  height="310"
                  src={`https://www.youtube.com/embed/${el.key}`}
                  title={data.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  style={{ margin: "10px", border: "none" }}
                ></iframe>
              );
            })}
        </div>
      </div> */}
    </>
  );
}
