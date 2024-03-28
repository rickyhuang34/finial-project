import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Trending.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function Trending({ setId }) {
  const [result, setResult] = useState([]);
  const [onDayFocus, setOnDayFocus] = useState(true);
  const [onWeekFocus, setOnWeekFocus] = useState(false);
  const [tvActive, setTvActive] = useState(false);
  const [movieActive, setMovieActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({});

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
      });

      setResult(data.results);
      console.log(result);
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

  // function handleMovieClick(e) {
  //   const id = e.target.getAttribute("m-id");
  //   console.log(id);
  //   // setId(id);
  // }

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <div className={styles.trending}>
      <div className={styles["trending-header"]}>
        <h2>Trending</h2>
        <button
          className={styles["movie-btn"]}
          onClick={handleMoviesBtnClick}
          style={{
            backgroundColor: movieActive ? "red" : "black",
            boxShadow: movieActive ? "2px 2px 10px black inset" : "none",
          }}
        >
          Movies
        </button>
        <button
          className={styles["tv-btn"]}
          onClick={handleTvClick}
          style={{
            backgroundColor: tvActive ? "red" : "black",
            boxShadow: tvActive ? "2px 2px 10px black inset" : "none",
          }}
        >
          TV Shows
        </button>
      </div>
      <div className={styles.wrapper} style={{ border: "2px solid yellow" }}>
        {result.map((el) => {
          return <div></div>;
        })}
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

        <div className={styles["trending-movies"]}>
          <Slider {...settings}>
            {loading && <p>Loading...</p>}
            {result.map((el) => {
              if (el.media_type === "movie") {
                return (
                  <div key={el.id} className={styles.movie}>
                    <Link to={`/movie/${el.id}`}>
                      <img
                        className={styles.movieImg}
                        src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                        alt={el.title}
                        m-id={el.id}
                        // onClick={handleMovieClick}
                      />
                    </Link>
                    <p
                      movieid={el.id}
                      // onClick={handleMovieClick}
                      style={{
                        cursor: "pointer",
                        height: "auto",
                        textAlign: "center",
                      }}
                    >
                      {el.title}
                    </p>
                    <p style={{ color: "gray", fontSize: "12px" }}>
                      {el.release_date}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div key={el.id} className={styles["tv-show"]}>
                    <img
                      className={styles.showImg}
                      src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                      alt={el.name}
                      t-id={el.id}
                    />
                    <p
                      style={{
                        cursor: "pointer",
                        height: "auto",
                        textAlign: "center",
                      }}
                    >
                      {el.name}
                    </p>
                    <p style={{ color: "gray", fontSize: "12px" }}>
                      {el.first_air_date ? el.first_air_date : ""}
                    </p>
                  </div>
                );
              }
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
