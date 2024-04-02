import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import MovieDiscover from "./Components/MovieDiscover.jsx";
import MoviePage from "./Components/MoviePage.jsx";
import ShowDiscover from "./Components/ShowDiscover.jsx";
import ShowPage from "./Components/ShowPage.jsx";
import Navbar from "./Components/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies">
          <Route index element={<MovieDiscover />} />
          <Route path=":id" element={<MoviePage />} />
        </Route>
        <Route path="/shows">
          <Route index element={<ShowDiscover />} />
          <Route path=":id" element={<ShowPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
