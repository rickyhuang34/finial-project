import React, { useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TvIcon from "@mui/icons-material/Tv";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState("Movies");
  const navigate = useNavigate();

  useEffect(() => {
    if (value === "Movies") navigate("/popularM");
    else if (value === "TV series") navigate("/popularS");
  }, [value, navigate]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      style={{ width: "100%", backgroundColor: "#39445a", zIndex: "100" }}
    >
      <BottomNavigationAction
        label="Movies"
        value="Movies"
        icon={<LocalMoviesIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="TV series"
        value="TV series"
        icon={<TvIcon />}
        style={{ color: "white" }}
      />
    </BottomNavigation>
  );
}
