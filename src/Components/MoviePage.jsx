import { useEffect, useState } from "react";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function MoviePage() {
  const [data, setData] = useState({});
  const [config, setConfig] = useState({});

  useEffect(() => {
    getMovieById();
  }, []);

  async function getMovieById() {
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
        `https://api.themoviedb.org/3/movie/359410?append_to_response=credits,videos`,
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
      // console.log(apiConfig.images);
    } catch (error) {
      console.log("Get movie error", error);
    }
  }
  console.log(data);
  return (
    <div
      style={{
        background: `url(${config.baseURL}${config.backdropSize}${data.backdrop_path}) no-repeat`,
        width: "100%",
        height: "500px",
        // filter: "opacity(50%) blur(2px)", 1920 800
      }}
    >
      <div
        style={{
          backdropFilter: "blur(5x)",
          width: "100%",
          height: "500px",
          display: "flex",
          backgroundColor: "hsla(149, 1%, 23%, .5)",
        }}
      >
        <img
          style={{ width: "auto", height: "350px", margin: "20px" }}
          src={`${config.baseURL}${config.posterSize}${data.poster_path}`}
          alt={data.title}
        />
        <div style={{ marginTop: "20px" }}>
          <h2>{data.title}</h2>
          {data.genres &&
            data.genres.map((genre) => {
              return <span key={genre.id}>{genre.name}</span>;
            })}
          <hr />
          <p>{data.tagline}</p>
          <p>{data.overview}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <span>Status: {data.status}</span>
            <span>Release Date: {data.release_date}</span>
            <span>Runtime: {data.runtime}</span>
          </div>

          {data.credits &&
            data.credits.crew.map((ppl) => {
              return (
                <div>
                  <span>
                    {ppl.job === "Director" ? `${ppl.job}: ${ppl.name}` : null}
                  </span>
                </div>
              );
            })}
          {data.credits &&
            data.credits.crew.map((ppl) => {
              return (
                <div>
                  <span>
                    {ppl.job === "Original Film Writer" ? (
                      <li>{`Writer: ${ppl.name}`}</li>
                    ) : null}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
