import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState(true);

  function isActive() {}

  return (
    <nav className={styles["nav-bar"]}>
      <Link to="/">
        <img
          className={styles["moviedb-logo"]}
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="logo"
        />
      </Link>
      <ul className={styles.list}>
        <li key="home">
          <Link to="/" onClick={isActive}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/movies" onClick={isActive}>
            Movies
          </Link>
        </li>
        <li>
          <Link to="/shows" onClick={isActive}>
            TV Shows
          </Link>
        </li>
      </ul>
    </nav>
  );
}
