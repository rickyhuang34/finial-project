import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Trending2.module.css";
import { Skeleton } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function Trending({ setId }) {
  const [result, setResult] = useState([]);
  const [onDayFocus, setOnDayFocus] = useState(true);
  const [onWeekFocus, setOnWeekFocus] = useState(false);
  const [tvActive, setTvActive] = useState(false);
  const [movieActive, setMovieActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    trendingMovieDay();
  }, []);

  async function trendingMovieDay() {
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
      const result = await response.json();

      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.json();

      // File path used in getting poster img
      setConfig({
        baseURL: result.images.secure_base_url,
        posterSize: result.images.still_sizes[2],
        backdropSize: result.images.backdrop_sizes[3],
      });

      setResult(data.results);
    } catch (error) {
      console.log("Error fetching trending movies of day data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function trendingMovieWeek() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.json();

      setResult(data.results);
    } catch (error) {
      console.log("Error fetching trending movies of week data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function trendingTvDay() {
    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/tv/day`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();

      setResult(data.results);
    } catch (error) {
      console.log("Error fetching trending tv shows of day data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function trendingTvWeek() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/tv/week`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();

      setResult(data.results);
    } catch (error) {
      console.log("Error fetching trending tv shows of week data:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleDayClick() {
    if (movieActive) {
      trendingMovieDay();
    } else {
      trendingTvDay();
    }
  }

  function handleWeekClick() {
    if (movieActive) {
      trendingMovieWeek();
    } else {
      trendingTvWeek();
    }
  }

  function handleMoviesBtnClick() {
    setMovieActive(true);
    setTvActive(false);
    if (onDayFocus) {
      trendingMovieDay();
    } else {
      trendingMovieWeek();
    }
  }

  function handleTvClick() {
    setMovieActive(false);
    setTvActive(true);
    if (onDayFocus) {
      trendingTvDay();
    } else {
      trendingTvWeek();
    }
  }

  function handleDayFocus(e) {
    setOnDayFocus(true);
    setOnWeekFocus(false);
    e.target.style.backgroundColor = onDayFocus ? "red" : "grey";
  }

  function handleWeekFocus() {
    setOnDayFocus(false);
    setOnWeekFocus(true);
  }

  function handleMouseEnter(e) {
    e.target.style.transform = "scale(1.05, 1.05)";
    e.target.style.zIndex = "2";
    e.target.style.cursor = "pointer";
    e.target.style.transition = ".5s all ease-in-out";
  }

  function handleMouseLeave(e) {
    e.target.style.transform = "scale(1,1)";
    e.target.style.zIndex = "0";
    e.target.style.transition = ".5s all ease-in-out";
  }

  function handleClickNext() {
    const slideWidth = containerRef.current.clientWidth;
    containerRef.current.scrollLeft += slideWidth;
  }

  function handleClickPrev() {
    const slideWidth = containerRef.current.clientWidth;
    containerRef.current.scrollLeft -= slideWidth;
  }

  return result ? (
    <div className={styles.trending}>
      <div className={styles.trendingHeader} style={{ display: "flex" }}>
        <h2>Trending</h2>
        <button
          className={styles.movieBtn}
          onClick={handleMoviesBtnClick}
          style={{
            backgroundColor: movieActive ? "red" : "black",
            boxShadow: movieActive ? "2px 2px 10px black inset" : "none",
          }}
        >
          Movies
        </button>
        <button
          className={styles.tvBtn}
          onClick={handleTvClick}
          style={{
            backgroundColor: tvActive ? "red" : "black",
            boxShadow: tvActive ? "2px 2px 10px black inset" : "none",
          }}
        >
          TV Shows
        </button>
        <div className={styles["toggle-tab"]}>
          <button
            onClick={handleDayClick}
            onFocus={handleDayFocus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor: onDayFocus ? "red" : "black",
              boxShadow: onDayFocus ? "2px 2px 10px black inset" : "none",
            }}
            className={styles.day}
          >
            Day
          </button>
          <button
            onClick={handleWeekClick}
            onFocus={handleWeekFocus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor: onWeekFocus ? "red" : "black",
              boxShadow: onWeekFocus ? "2px 2px 10px black inset" : "none",
            }}
            className={styles.week}
          >
            Week
          </button>
        </div>
      </div>

      <div
        className={styles.container}
        ref={containerRef}
        style={{
          width: "100%",
          height: "490px",
          overflowY: "hidden",
          overflowX: "hidden",
          display: "flex",
        }}
      >
        {result.map((el) => {
          if (el.media_type === "movie") {
            return (
              <div
                key={el.id}
                className={styles.backdrop}
                style={{
                  background: `url("${config.baseURL}${config.backdropSize}${el.backdrop_path}") no-repeat center`,
                  minHeight: "500px",
                  minWidth: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundSize: "cover",
                  // marginright: "5px",
                  // backdropFilter: "blur(6px)",
                }}
              >
                <div className={styles["contentWrapper"]}>
                  <div>
                    <button
                      className={styles.buttonPrev}
                      onClick={handleClickPrev}
                    >
                      &#8249;
                    </button>
                    <button
                      className={styles.buttonNext}
                      onClick={handleClickNext}
                    >
                      &#8250;
                    </button>
                    <h1
                      movieid={el.id}
                      style={{
                        height: "auto",
                        // textAlign: "center",
                        color: "black",
                      }}
                    >
                      {el.title}
                    </h1>
                    <p
                      style={{
                        color: "black",
                        fontSize: "18px",
                        width: "500px",
                        margin: "20px",
                      }}
                    >
                      {el.overview}
                    </p>
                    <Link to={`/movies/${el.id}`}>
                      <button>More</button>
                    </Link>
                  </div>

                  <Link to={`/movies/${el.id}`}>
                    <img
                      key={el.id}
                      className={styles.movieImg}
                      src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                      alt={el.title}
                      style={{
                        width: "200px",
                        height: "auto",
                        borderRadius: "8px",
                        postion: "fixed",
                        right: "0",
                        top: "0px",
                      }}
                    />
                  </Link>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={el.id}
                className={styles.backdrop}
                style={{
                  background: `url("${config.baseURL}${config.backdropSize}${el.backdrop_path}") no-repeat center`,
                  minHeight: "500px",
                  minWidth: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundSize: "cover",
                  // marginright: "5px",
                  // backdropFilter: "blur(6px)",
                }}
              >
                <div className={styles["contentWrapper"]}>
                  {loading && <p>Loading...</p>}

                  <div>
                    <button
                      className={styles.buttonPrev}
                      onClick={handleClickPrev}
                    >
                      &#8249;
                    </button>
                    <button
                      className={styles.buttonNext}
                      onClick={handleClickNext}
                    >
                      &#8250;
                    </button>
                    <h1
                      movieid={el.id}
                      style={{
                        height: "auto",
                        // textAlign: "center",
                        color: "black",
                      }}
                    >
                      {el.name}
                    </h1>
                    <p
                      style={{
                        color: "black",
                        fontSize: "18px",
                        width: "500px",
                        margin: "20px",
                      }}
                    >
                      {el.overview}
                    </p>
                    <Link to={`/show/${el.id}`}>
                      <button>More</button>
                    </Link>
                  </div>

                  <Link to={`/show/${el.id}`}>
                    <img
                      key={el.id}
                      className={styles.movieImg}
                      src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                      alt={el.name}
                      style={{
                        width: "200px",
                        height: "auto",
                        borderRadius: "8px",
                        postion: "fixed",
                        right: "0",
                        top: "0px",
                      }}
                    />
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  ) : (
    <Skeleton
      variant="rounded"
      width={400}
      height={300}
      sx={{ bgcolor: "red" }}
    />
  );
}
