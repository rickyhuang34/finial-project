import { useEffect, useState } from "react";
import styles from "./Styles/Search.module.css";
import defaultPoster from "./Images/defaultPoster.jpg";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const token = `${process.env.REACT_APP_TOKEN}`;

const Search = () => {
  const [config, setConfig] = useState({});
  const [result, setResult] = useState({});
  const [type, setType] = useState("movie");
  const [userInput, setUserInput] = useState("");
  const [adult, setAdult] = useState(true);
  const [langList, setLangList] = useState([]);
  const [lang, setLang] = useState("en-US");
  const [page, setPage] = useState(1);

  useEffect(() => {
    multiSearch();
    // getLang();
  }, []);

  const multiSearch = async () => {
    try {
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

      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/${type}?query=${userInput}&language=${lang}&page=1`, //&include_adult=${adult}
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const searchResult = await searchResponse.json();

      console.log(searchResult);
      setResult(searchResult);
    } catch (error) {
      console.log(error, "error");
    }
  };

  // const getLang = async () => {
  //   const langResponse = await fetch(
  //     `https://api.themoviedb.org/3/configuration/languages`,
  //     {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }
  //   );
  //   const langResult = await langResponse.json();
  //   console.log(langResult);
  //   setLangList(langResult);
  // };

  function handleSubmit(e) {
    e.preventDefault();
    multiSearch();
  }

  // const languages = langList.map((lang) => {
  //   return {
  //     label: lang.iso_639_1 + "-" + lang.english_name,
  //     value: lang.iso_639_1,
  //   };
  // });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          placeholder="Search for movies or shows"
          name="userInput"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {/* <label>Adult</label>
        <select
          id="adult"
          onChange={(e) => setAdult(e.target.value)}
          value={adult}
        > */}
        {/* <option value=""></option> */}
        {/* <option value="false">False</option>
          <option value="true">True</option>
        </select> */}

        <label>Type</label>
        <select
          id="type"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>

        {/* <Autocomplete
          value={languages.value}
          disablePortal
          id="combo-box-lang"
          options={languages}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField
              style={{ backgroundColor: "white" }}
              {...params}
              label="Languages"
            />
          )}
        /> */}
      </div>

      <div className={styles.container}>
        {result &&
          result.results &&
          result.results.map((el) =>
            el.title ? (
              <Link
                key={el.id}
                to={`/movies/${el.id}`}
                style={{
                  display: "block",
                  width: "150px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={
                    el.poster_path !== null
                      ? `${config.baseURL}${config.posterSize}${el.poster_path}`
                      : `${defaultPoster}`
                  }
                  alt={el.title}
                  className={styles.poster}
                />
              </Link>
            ) : (
              <Link
                key={el.id}
                to={`/shows/${el.id}`}
                style={{
                  display: "block",
                  width: "150px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={
                    el.poster_path !== null
                      ? `${config.baseURL}${config.posterSize}${el.poster_path}`
                      : `${defaultPoster}`
                  }
                  alt={el.name}
                  className={styles.poster}
                />
              </Link>
            )
          )}
      </div>
      {result && (
        <>
          <p>
            Page {result.page} of {result.total_pages}
          </p>
        </>
      )}
    </>
  );
};

export default Search;

// input for query
// include adult - true or false, options
// config languages, fixed - options
// page
