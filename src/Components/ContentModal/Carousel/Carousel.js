import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../Config/Config";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
  //这里前后不重要
  const [credits, setCredits] = useState([]); //这里必须设credits为空数组，不能是undefined

  const items = credits.map(
    (
      c //这里credits后面不加?
    ) => (
      <div className="carouselItem">
        <img
          src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
          alt={c?.name} //这里为什么加?
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b>{c?.name}</b>
      </div>
    )
  );

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Gallery;
