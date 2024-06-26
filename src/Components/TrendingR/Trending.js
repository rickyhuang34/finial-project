import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../SingleContent/SingleContent";
import "./Trending.css";
// import CustomPageination from "../../Components/Pagination/CustomPagination"

const Trending1 = () => {
  const [page, setPage] = useState(1);

  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );

    // console.log(data.results);

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <div className="pageTitle">Trending</div>

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path || c.backdrop_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average.toFixed(1)}
            />
          ))}
      </div>

      {/* <CustomPageination setPage={setPage}/> */}
    </div>
  );
};

export default Trending1;
