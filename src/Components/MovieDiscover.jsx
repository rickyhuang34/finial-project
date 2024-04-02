import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MovieDiscover.module.css";
import { Button, Skeleton } from "@mui/material";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function MovieDiscover() {
  const [config, setConfig] = useState({});
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState({
    results: [],
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    discoverMovie();
  }, []);

  // load more pages - infinite scrolling
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollHeight = document.documentElement.scrollHeight;
  //     const scrollTop =
  //       document.documentElement.scrollTop || document.body.scrollTop;
  //     const clientHeight = document.documentElement.clientHeight;
  //     const threshold = 200;

  //     if (scrollTop + clientHeight >= scrollHeight - threshold) {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  async function discoverMovie() {
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
        `https://api.themoviedb.org/3/discover/movie?page=${page}`,
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

      // setData(result);
      setData((prevData) => ({
        ...prevData,
        results: [...prevData.results, ...result.results],
      }));
      // console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setUserInput(e.target.value);
    // console.log(userInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${userInput}&language=en-US&page=1`,
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search for a movie, tv show, person..."
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
      <div className={styles.container} id={styles["my-element"]}>
        {/* {loading ? (
          <Skeleton
            variant="rounded"
            width={150}
            height={300}
            sx={{ bgcolor: "grey.900" }}
          />
        ) : ( */}
        <>
          {data.results &&
            data.results.map((el, index) => {
              return (
                <div
                  key={el.id}
                  className={styles.movieContainer}
                  style={{ animationDelay: index / 20 + "s" }}
                >
                  <Link
                    to={`/movies/${el.id}`}
                    style={{ textDecoration: "none" }}
                    key={el.id}
                  >
                    <img
                      className={styles.poster}
                      src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                      alt={el.title}
                    />
                    <p className={styles.movieTitle}>{el.title}</p>
                    <p className={styles.date}>
                      {new Date(el.release_date)
                        .toDateString()
                        .slice(4)
                        .replaceAll(" ", "/")}
                    </p>
                  </Link>
                </div>
              );
            })}
          <Button>Load More</Button>
        </>
        {/* )} */}
      </div>
    </>
  );
}
