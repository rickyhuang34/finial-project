import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import styles from "../Styles/ShowPage.module.css";
import defaultImg from "../Images/defaultImg.jpg";
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import { BiCalendar, BiSolidStar } from "react-icons/bi";
import { FaFilm } from "react-icons/fa";
import ShowAbout from "./ShowAbout";
import RecommendShows from "./RecommendShows";

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
      console.log(result);

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
          backgroundImage: `linear-gradient(rgba(0,0,0,.5) , rgba(0,0,0,.5)), url(${config.baseURL}${config.backdropSize}${data.backdrop_path})`,
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
              alt={data.name}
            />
          </div>
          <div className={styles.right}>
            <div>
              <h2 className={styles.name}>
                {data.name}{" "}
                <span style={{ color: "#bababa", fontSize: "0.9em" }}>
                  {data.first_air_date && data.first_air_date.slice(0, 4)}
                </span>
              </h2>

              <ul className={styles.info}>
                <li key="date">
                  <BiCalendar style={{ verticalAlign: "-12%" }} />{" "}
                  {data.first_air_date &&
                    new Date(data.first_air_date).toLocaleDateString("en-US")}
                </li>
                <li key="seasons">
                  <PiTelevisionSimpleDuotone
                    style={{ verticalAlign: "-12%" }}
                  />{" "}
                  {data.number_of_seasons > 1
                    ? data.number_of_seasons + " Seasons"
                    : data.number_of_seasons + " Season"}
                </li>
                <li key="episodes">
                  <FaFilm style={{ verticalAlign: "-12%" }} />{" "}
                  {data.number_of_episodes > 1
                    ? data.number_of_episodes + " Episodes"
                    : data.number_of_episodes + " Episode"}
                </li>
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

            <p>
              <BiSolidStar style={{ color: "yellow", verticalAlign: "-12%" }} />{" "}
              {Math.round(data.vote_average * 10) / 10}
            </p>

            <ul className={styles.genre}>
              {data.genres &&
                data.genres.map((genre) => {
                  return (
                    <Link
                      to={`/shows/genre/${genre.id}`}
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
      <ShowAbout data={data} config={config} />

      <RecommendShows config={config} id={id} data={data} />
    </>
  );
}
