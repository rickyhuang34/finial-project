import styles from "./ShowDiscover.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function ShowDiscover() {
  const [config, setConfig] = useState({});
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    discoverShow();
  }, [userInput]);

  async function discoverShow() {
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

      const res = await fetch(`https://api.themoviedb.org/3/discover/tv`, {
        headers: {
          Authorization: token,
        },
      });
      const result = await res.json();

      setConfig({
        baseURL: apiConfig.images.secure_base_url,
        backdropSize: apiConfig.images.backdrop_sizes[2],
        posterSize: apiConfig.images.still_sizes[2],
      });

      setData(result);
      console.log(result);
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
    // console.log(resData);

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
      <div className={styles.container}>
        {loading && <p>Loading...</p>}
        {data.results &&
          data.results.map((el) => {
            return (
              <Link to={`/shows/${el.id}`} style={{ textDecoration: "none" }}>
                <div key={el.id} className={styles.showContainer}>
                  <img
                    src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                    alt={el.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                  <p
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      padding: "5px",
                      color: "white",
                    }}
                  >
                    {el.name}
                  </p>
                  <p
                    style={{
                      width: "100%",
                      fontSize: "10px",
                      color: "grey",
                      paddingLeft: "5px",
                    }}
                  >
                    {new Date(el.first_air_date)
                      .toDateString()
                      .slice(4)
                      .replaceAll(" ", "/")}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}
