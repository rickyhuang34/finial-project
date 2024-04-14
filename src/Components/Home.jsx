import Trending from "./Trending";
import Footer from "./Footer/Footer.js";
import FreeWatch from "./FreeWatch/FreeWatch.js";
import Join from "./Join/Join.js";
import Trailer from "./Trailer/Trailer.js";

export default function Home() {
  return (
    <>
      <Trending />
      <Trailer />
      <FreeWatch />
      <Join />
      <Footer />
    </>
  );
}
