import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/Home.jsx";
import MoviePage from "./Components/MoviePage.jsx";

const token = `${process.env.REACT_APP_TOKEN}`;

function App() {
  const [userInput, setUserInput] = useState("");

  function handleChange(e) {
    setUserInput(e.target.value);
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
    const data = await res.json();
    console.log(data);

    setUserInput("");
  }
  return (
    <>
      <nav className="nav-bar">
        <Link to="/">
          <img
            className="moviedb-logo"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="logo"
          />
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search for a movie, tv show, person..."
            onChange={handleChange}
            vlaue={userInput}
            type="text"
          />
          <button type="submit">Sumbit</button>
        </form>
        <ul className="list">
          <li>
            <Link to="/movie">Movies</Link>
          </li>
          <li>
            <Link to="/">TV Shows</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </>
  );
}

export default App;
