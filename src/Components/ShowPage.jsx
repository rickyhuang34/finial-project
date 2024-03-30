import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function ShowPage() {
  const [data, setData] = useState({});
  const [config, setConfig] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getShowById();
  }, []);

  async function getShowById() {
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
      });

      setData(result);
      console.log(result);
    } catch (error) {
      console.log("Get movie error", error);
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${config.baseURL}${config.backdropSize}${data.backdrop_path})`,
          width: "100%",
          height: "500px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "cover",
          backgroundBlendMode: "darken",
          backgroundAttachment: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backdropFilter: "blur(3px)",
            width: "80%",
            height: "400px",
            display: "flex",
            backgroundColor: "hsla(149, 1%, 23%, .5)",
            borderRadius: "10px",
          }}
        >
          <img
            style={{
              width: "auto",
              height: "300px",
              margin: "20px",
              borderRadius: "8px",
              boxShadow: "-5px 5px 10px black",
            }}
            src={`${config.baseURL}${config.posterSize}${data.poster_path}`}
            alt={data.title}
          />
          <div style={{ marginTop: "20px", width: "500px" }}>
            <h2>{data.name}</h2>
            {data.genres &&
              data.genres.map((genre) => {
                return <span key={genre.id}>{genre.name}</span>;
              })}
            <hr style={{ width: "300px" }} />

            <p style={{ padding: "20px 0" }}>{data.overview}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <span>Status: {data.status}</span>
              <span>First Air Date: {data.first_air_date}</span>
            </div>
            <p>
              Seasons:{" "}
              <span>
                {data.number_of_seasons} Episodes: {data.number_of_episodes}
              </span>
            </p>

            {data.credits &&
              data.credits.crew.map((ppl) => {
                return (
                  <div>
                    <span>
                      {ppl.job === "Creator" ? `${ppl.job}: ${ppl.name}` : null}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <p style={{ height: "500px" }}>hi</p>
    </>
  );
}
