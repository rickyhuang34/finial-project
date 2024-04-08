import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import MovieDiscover from "./Components/Movie/MovieDiscover.jsx";
import MoviePage from "./Components/Movie/MoviePage.jsx";
import ShowDiscover from "./Components/TvShow/ShowDiscover.jsx";
import ShowPage from "./Components/TvShow/ShowPage.jsx";
import Navbar from "./Components/Navbar.jsx";
import MovieGenre from "./Components/Movie/MovieGenre.jsx";
import ShowGenre from "./Components/TvShow/ShowGenre.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies">
          <Route index element={<MovieDiscover />} />
          <Route path=":id" element={<MoviePage />} />
          <Route path="genre/:genreid" element={<MovieGenre />} />
        </Route>
        <Route path="/shows">
          <Route index element={<ShowDiscover />} />
          <Route path=":id" element={<ShowPage />} />
          <Route path="genre/:genreid" element={<ShowGenre />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
