import { useEffect, useState } from "react";
import styles from "./Styles/Videos.module.css";

export default function Videos({ trailers, data }) {
  const [selectedType, setSelectedType] = useState("Trailer");

  useEffect(() => {
    filterVideos(selectedType);
  }, [selectedType]);

  const trailerCount = trailers.filter((el) => el.type === "Trailer").length;
  const clipCount = trailers.filter((el) => el.type === "Clip").length;
  const featuretteCount = trailers.filter(
    (el) => el.type === "Featurette"
  ).length;
  const teaserCount = trailers.filter((el) => el.type === "Teaser").length;
  const btsCount = trailers.filter(
    (el) => el.type === "Behind the Scenes"
  ).length;

  function filterVideos(type) {
    setSelectedType(type);
  }

  return (
    <div className={styles["video-container"]}>
      <h1 className={styles.videoHeader}>
        Videos{" "}
        <span style={{ fontSize: "0.8em", color: "#4d4d4d" }}>
          {trailers.length}
        </span>
        {trailers && (
          <div className={styles.videoSelection}>
            <span
              onClick={() => filterVideos("Trailer")}
              style={{
                color: selectedType === "Trailer" ? "purple" : "",
                borderBottom:
                  selectedType === "Trailer" ? "2px solid purple" : "none",
              }}
            >
              Trailer {trailerCount}
            </span>
            <span
              onClick={() => filterVideos("Clip")}
              style={{
                color: selectedType === "Clip" ? "purple" : "",
                borderBottom:
                  selectedType === "Clip" ? "2px solid purple" : "none",
              }}
            >
              Clip {clipCount}
            </span>
            <span
              onClick={() => filterVideos("Featurette")}
              style={{
                color: selectedType === "Featurette" ? "purple" : "",
                borderBottom:
                  selectedType === "Featurette" ? "2px solid purple" : "none",
              }}
            >
              Featurette {featuretteCount}
            </span>
            <span
              onClick={() => filterVideos("Teaser")}
              style={{
                color: selectedType === "Teaser" ? "purple" : "",
                borderBottom:
                  selectedType === "Teaser" ? "2px solid purple" : "none",
              }}
            >
              Teaser {teaserCount}
            </span>
            <span
              onClick={() => filterVideos("Behind the Scenes")}
              style={{
                color: selectedType === "Behind the Scenes" ? "purple" : "",
                borderBottom:
                  selectedType === "Behind the Scenes"
                    ? "2px solid purple"
                    : "none",
              }}
            >
              Behind the Scenes {btsCount}
            </span>
          </div>
        )}
      </h1>
      <div className={styles["video-wrapper"]}>
        {data &&
          trailers.map((el) =>
            el.type === selectedType ? (
              <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/${el.key}`}
                title={data.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              ></iframe>
            ) : null
          )}
      </div>
    </div>
  );
}
