import { Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SingleContent from "../SingleContent/SingleContent";
import CustomPagination from "../Pagination/CustomPagination";
import styles from "./Search.module.css";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const darkTheMe = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&include_adult=false&language=en-US&page=${page}&query=${searchText}`
    );

    setContent(data.results);

    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div className={styles.container}>
      <ThemeProvider theme={darkTheMe}>
        <div className={styles.inputWrapper}>
          <TextField
            style={{ flex: "1", backgroundColor: "white" }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{
            paddingBottom: "5px",
            width: "50%",
          }}
        >
          <Tab style={{ width: "50%", color: "white" }} label="Search Movies" />
          <Tab
            style={{ width: "50%", color: "white" }}
            label="Search TV series"
          />
        </Tabs>
      </ThemeProvider>

      <div className={styles.mediaWrapper}>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path || c.backdrop_path}
              title={
                (c &&
                  (c.title && c.title.length < 20
                    ? c.title
                    : c?.title?.substring(0, 20).concat("..."))) ||
                (c &&
                  (c.name && c.name.length < 20
                    ? c.name
                    : c?.name?.substring(0, 20).concat("...")))
              }
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={
                c?.vote_average ? c?.vote_average?.toFixed(1) : null
              }
            />
          ))}
        {searchText &&
          content.length < 1 &&
          (type ? <h2>No Series found</h2> : <h2>No Movies found</h2>)}
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
