import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Trending.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slick.css";
import { Skeleton } from "@mui/material";
import movieColorIcon from "./Images/movieColorIcon.png";
import tvColorIcon from "./Images/tvColorIcon.png";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function Trending({ setId }) {
  const [result, setResult] = useState([]);
  const [onDayFocus, setOnDayFocus] = useState(true);
  const [onWeekFocus, setOnWeekFocus] = useState(false);
  const [tvActive, setTvActive] = useState(false);
  const [movieActive, setMovieActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({});
  const backgroundRef = useRef();

  useEffect(() => {
    trendingMovieDay();
  }, []);

  useEffect(() => {
    backgroundRef.current.style.backgroundImage =
      result.length > 0
        ? `url(${config.baseURL}${config.backdropSize}${result[0].backdrop_path})`
        : "none";
  });

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
    setLoading(true);
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
    setLoading(true);
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
    e.target.style.transition = ".3s all ease-in-out";
  }

  function handleMouseLeave(e) {
    e.target.style.transform = "scale(1,1)";
    e.target.style.zIndex = "0";
    e.target.style.transition = ".3s all ease-in-out";
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 4,
    variableWidth: true,
    rows: 1,
    pauseOnFocus: true,
    pauseOnHover: true,
  };

  function handleHover(i) {
    backgroundRef.current.style.backgroundImage = `url(${config.baseURL}${config.backdropSize}${result[i].backdrop_path})`;
  }

  return (
    <>
      <div className={styles.container} ref={backgroundRef}>
        <div className={styles.wrapper}>
          <h2 className={styles.sectionHeader}>Trending</h2>
          {/* <p>{result[0].title}</p> */}
        </div>
      </div>

      {loading ? (
        <div className={styles.skeletonDiv}>
          <Skeleton
            variant="rounded"
            width={150}
            height={225}
            sx={{ bgcolor: "grey.900" }}
          />
          <Skeleton
            variant="rounded"
            width={150}
            height={225}
            sx={{ bgcolor: "grey.900" }}
          />
          <Skeleton
            variant="rounded"
            width={150}
            height={225}
            sx={{ bgcolor: "grey.900" }}
          />
          <Skeleton
            variant="rounded"
            width={150}
            height={225}
            sx={{ bgcolor: "grey.900" }}
          />
        </div>
      ) : (
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
            {result.map((el, i) => {
              if (el.media_type === "movie") {
                return (
                  <Link
                    to={`/movies/${el.id}`}
                    style={{ display: "block", width: "100px" }}
                    key={el.id}
                  >
                    <img
                      onMouseEnter={function something() {
                        handleHover(i);
                      }}
                      key={el.id}
                      className={styles.movieImg}
                      src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                      alt={el.title}
                      style={{
                        width: "150px",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                    {/* <p
                      style={{
                        width: "150px",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      {el.title}
                    </p> */}
                  </Link>
                );
              } else {
                return (
                  <Link
                    to={`/shows/${el.id}`}
                    style={{ display: "block", width: "100px" }}
                    key={el.id}
                  >
                    <img
                      onMouseEnter={function something() {
                        handleHover(i);
                      }}
                      key={el.id}
                      className={styles.movieImg}
                      src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                      alt={el.name}
                      style={{
                        width: "150px",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                    {/* <p style={{ width: "150px", textAlign: "center" }}>
                      {el.name}
                    </p> */}
                  </Link>
                );
              }
            })}
          </Slider>
        </div>
      )}
      <div className={styles.movieTvshow}>
        <img
          src={movieColorIcon}
          alt="movie"
          onClick={handleMoviesBtnClick}
          className={styles.movieIcon}
          style={{
            filter: movieActive ? "none" : "grayscale(100%)",
            transform: movieActive ? "scale(1.1,1.1)" : "scale(0.9,0.9)",
          }}
        />
        <img
          src={tvColorIcon}
          alt="tv-show"
          onClick={handleTvClick}
          className={styles.tvIcon}
          style={{
            filter: tvActive ? "none" : "grayscale(100%)",
            transform: tvActive ? "scale(1.1,1.1)" : "scale(0.9,0.9)",
          }}
        />
      </div>

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
    </>
  );
}
