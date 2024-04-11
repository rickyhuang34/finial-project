import { useState } from "react";
import styles from "./Styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Menu, MenuItem, Avatar, IconButton, Button } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <nav className={styles["nav-bar"]}>
      <Link to="/">
        <img
          className={styles["moviedb-logo"]}
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="logo"
        />
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "400px",
        }}
      >
        <ul className={styles.list}>
          <li key="home">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/shows">TV Shows</Link>
          </li>
          {/* <li>
            <Link to="/search">Search</Link>
          </li> */}
        </ul>
        {user && (
          <>
            <IconButton onClick={handleClick}>
              <Avatar
                sx={{ bgcolor: deepOrange[500], width: 26, height: 26 }}
                style={{ color: "white" }}
                alt={user.email}
              />
            </IconButton>
            <Menu
              open={open}
              onClick={handleClose}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem>
                <Link
                  to="/watchlist"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Watchlist
                </Link>
              </MenuItem>
              <MenuItem
                onClick={logout}
                style={{ fontFamily: "Times New Roman", color: "black" }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
        {!user && (
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#8a07f5", color: "white" }}
            onClick={handleGoogleLogin}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
