import { useState } from "react";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function Navbar() {
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
          accept: "application/json",
          Authorization: token,
        },
      }
    );
    const data = await res.json();
    console.log(data);

    setUserInput("");
  }

  return (
    <nav className="nav-bar">
      <img
        className="moviedb-logo"
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        alt="logo"
      />
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
          <a href="#">Movies</a>
        </li>
        <li>
          <a href="#">TV Shows</a>
        </li>
      </ul>
    </nav>
  );
}
