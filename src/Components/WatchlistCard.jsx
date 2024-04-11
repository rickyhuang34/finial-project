import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import styles from "./Styles/WatchlistCard.module.css";
import { BiSolidStar } from "react-icons/bi";
import { FaSquareMinus } from "react-icons/fa6";

const token = `${process.env.REACT_APP_TOKEN}`;

export const WatchlistCard = ({ item, setWatchlist }) => {
  const [config, setConfig] = useState({});
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();

  const configFunc = async () => {
    const configResponse = await fetch(
      "https://api.themoviedb.org/3/configuration",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const configResult = await configResponse.json();
    setConfig({
      baseURL: configResult.images.secure_base_url,
      posterSize: configResult.images.still_sizes[2],
      backdropSize: configResult.images.backdrop_sizes[3],
    });
  };

  useEffect(() => {
    configFunc();
  }, []);

  const handleRemoveClick = (e) => {
    e.preventDefault();
    removeFromWatchlist(user.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        {item.title ? (
          <>
            <div className={styles.left}>
              <Link to={`/movies/${item.id}`}>
                <img
                  alt={item.id}
                  src={`${config.baseURL}${config.posterSize}${item.poster_path}`}
                  style={{
                    minWidth: "150px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </div>

            <div className={styles.right}>
              <h3>
                {item.title}{" "}
                <Tooltip title="Remove from watchlist">
                  <div
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      display: "inline-block",
                    }}
                  >
                    <FaSquareMinus
                      style={{
                        color: "red",
                        fontSize: "25px",
                        verticalAlign: "-20%",
                        zIndex: "5",
                        cursor: "pointer",
                      }}
                      onClick={handleRemoveClick}
                    />
                  </div>
                </Tooltip>
              </h3>

              <div style={{ display: "flex", gap: "20px" }}>
                <p style={{ fontSize: "18px", color: "green" }}>
                  {new Date(item.release_date).getFullYear()}
                </p>
                <p>
                  <BiSolidStar
                    style={{ color: "yellow", verticalAlign: "-12%" }}
                  />{" "}
                  {Math.round(item.vote_average * 10) / 10}
                </p>
              </div>

              <p>{item.overview}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to={`/shows/${item.id}`}>
                <img
                  alt={item.id}
                  src={`${config.baseURL}${config.posterSize}${item.poster_path}`}
                  style={{
                    minWidth: "150px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </div>

            <div className={styles.right}>
              <h3>
                {item.name}{" "}
                <Tooltip title="Remove from watchlist">
                  <div
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      display: "inline-block",
                    }}
                  >
                    <FaSquareMinus
                      style={{
                        color: "red",
                        fontSize: "25px",
                        verticalAlign: "-20%",
                        zIndex: "5",
                        cursor: "pointer",
                      }}
                      onClick={handleRemoveClick}
                    />
                  </div>
                </Tooltip>
              </h3>

              <div style={{ display: "flex", gap: "20px" }}>
                <p style={{ fontSize: "18px", color: "green" }}>
                  {new Date(item.first_air_date).getFullYear()}
                </p>
                <p>
                  <BiSolidStar
                    style={{ color: "yellow", verticalAlign: "-12%" }}
                  />{" "}
                  {Math.round(item.vote_average * 10) / 10}
                </p>
              </div>

              <p>{item.overview}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
