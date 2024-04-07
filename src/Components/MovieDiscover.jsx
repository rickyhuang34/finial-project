import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Styles/MovieDiscover.module.css";
import { Button } from "@mui/material";
import Loading from "./Loading";
import ScrollButton from "./ScrollButton";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function MovieDiscover() {
  const [config, setConfig] = useState({});
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    discoverMovie(1);
  }, []);

  async function discoverMovie(page) {
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
      setConfig({
        baseURL: apiConfig.images.secure_base_url,
        backdropSize: apiConfig.images.backdrop_sizes[2],
        posterSize: apiConfig.images.still_sizes[2],
      });

      if (page === 1) {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?page=${page}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const result = await res.json();
        setData(result);
        setShowSpinner(false);
      } else if (page >= 2) {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?page=${page}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const result = await res.json();
        setData((prevData) => ({
          ...prevData,
          results: [...prevData.results, ...result.results],
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (page === 1) {
        setLoading(false);
      } else if (page > 1) {
        setShowSpinner(false);
      }
    }
  }

  function handleChange(e) {
    setUserInput(e.target.value);
    // console.log(userInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${userInput}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const resData = await res.json();
    console.log(resData);

    setUserInput("");
  }

  function handleClickMore(e) {
    e.preventDefault();
    setShowSpinner(true);
    setPage(page + 1);
    discoverMovie(page + 1);
  }

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "10px 0" }}>Discover Movies</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search for a movie, tv show..."
          onChange={handleChange}
          value={userInput}
          type="text"
          className={styles.input}
          name="userInput"
        />
        <button type="submit" className={styles.submitBtn}>
          Sumbit
        </button>
      </form>

      <div className={styles.container}>
        {loading && !data.results ? (
          <Loading />
        ) : (
          <>
            {data.results &&
              data.results.map((el) => {
                return (
                  <div key={el.id} className={styles.movieContainer}>
                    <Link
                      to={`/movies/${el.id}`}
                      style={{
                        textDecoration: "none",
                        width: "fit-content",
                        height: "fit-content",
                      }}
                      key={el.id}
                    >
                      <img
                        className={styles.poster}
                        src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                        alt={el.title}
                      />
                    </Link>
                    <div className={styles.textContent}>
                      <Link
                        to={`/movies/${el.id}`}
                        style={{
                          textDecoration: "none",
                          width: "100%",
                          height: "fit-content",
                        }}
                        key={el.id}
                      >
                        <p className={styles.movieTitle}>{el.title}</p>
                      </Link>
                      <p className={styles.overview}>
                        {el.overview.slice(0, 100).concat("...")}
                      </p>
                      <p className={styles.date}>
                        {new Date(el.release_date)
                          .toDateString()
                          .slice(4)
                          .replaceAll(" ", "/")}
                      </p>
                    </div>
                  </div>
                );
              })}

            {!loading && data.results && (
              <>
                {showSpinner ? (
                  <Loading />
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleClickMore}
                    className={styles.loadMore}
                  >
                    Load More
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <ScrollButton />
    </>
  );
}
