import React from "react";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const CustomPagination = ({ setPage, numOfPages = 20 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    // window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <ThemeProvider theme={theme}>
        <Pagination
          count={numOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          hideNextButton
          hidePrevButton
          color="primary"
          style={{
            backgroundColor: "#4b515e",
            padding: "5px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
