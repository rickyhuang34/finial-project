import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import styles from "../Styles/MoviePage.module.css";
import { BiCalendar, BiSolidStar, BiTimeFive } from "react-icons/bi";
import PlayTrailer from "./PlayTrailer";
import Videos from "./Videos";
import MovieAbout from "./MovieAbout";
import RecommendMovies from "./RecommendMovies";

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
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos,release_dates`,
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
        posterSize: apiConfig.images.still_sizes[3],
      });

      setData(result);

      let youtubeVids = Object.values(result.videos.results);
      setTrailers(youtubeVids);
      console.log(result);
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
          background: `linear-gradient(rgba(0,0,0,.5) , rgba(0,0,0,.5)) , url(${config.baseURL}${config.backdropSize}${data.backdrop_path})`,
        }}
      >
        <div className={styles.wrapper} key={data.id}>
          <div className={styles.left}>
            <img
              style={{
                width: "250px",
                height: "auto",
                borderRadius: "5px",
              }}
              src={`${config.baseURL}${config.posterSize}${data.poster_path}`}
              alt={data.title}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.titleSection}>
              <h2 className={styles.title}>
                {data.title}{" "}
                <span style={{ color: "#bababa", fontSize: "0.9em" }}>
                  {data.release_date && data.release_date.slice(0, 4)}
                </span>
              </h2>

              <ul className={styles.info}>
                <li key="date">
                  <BiCalendar style={{ verticalAlign: "-12%" }} />
                  {data.release_date &&
                    new Date(data.release_date).toLocaleDateString("en-US")}
                </li>
                <li key="runtime">
                  <BiTimeFive style={{ verticalAlign: "-12%" }} />
                  {Math.floor(data.runtime / 60)}h{data.runtime % 60}m
                </li>
                {data.release_dates &&
                  data.release_dates.results.map((el, i) => {
                    if (el.iso_3166_1 === "US") {
                      const rating = el.release_dates.find(
                        (cert) => cert.certification !== ""
                      );
                      return rating ? (
                        <li key={i}>{rating.certification}</li>
                      ) : null;
                    } else return null;
                  })}
              </ul>

              <hr style={{ width: "300px" }} />
            </div>

            <div>
              <h3>Overview</h3>
              <p className={styles.overview}>{data.overview}</p>
            </div>

            {data.tagline ? (
              <p className={styles.tagline}>{data.tagline}</p>
            ) : null}

            <PlayTrailer data={data} trailers={trailers} />

            <p>
              <BiSolidStar style={{ color: "yellow", verticalAlign: "-12%" }} />{" "}
              {Math.round(data.vote_average * 10) / 10}
            </p>
            <ul className={styles.genre}>
              {data.genres &&
                data.genres.map((genre) => {
                  return (
                    <Link
                      to={`/movies/genre/${genre.id}`}
                      style={{
                        textDecoration: "none",
                        width: "fit-content",
                        height: "fit-content",
                        color: "white",
                      }}
                    >
                      <li key={genre.id}>{genre.name}</li>
                    </Link>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>

      <MovieAbout data={data} config={config} />

      <Videos data={data} trailers={trailers} />

      <RecommendMovies config={config} id={id} data={data} />
    </>
  );
}
