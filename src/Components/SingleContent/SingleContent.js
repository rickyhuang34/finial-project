import React from "react";
import { img_300, unavailable } from "../Config/Config";
import "./SingleContent.css";
import Badge from "@mui/material/Badge";
import ContentModal from "../ContentModal/ContentModal";
import { Link } from "react-router-dom";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <Link to={media_type === "movie" ? `/movies/${id}` : `/`}>
      {" "}
      {/*{media_type === "movie" ? `/` : `/`}*/}
      <ContentModal media_type={media_type} id={id}>
        <Badge
          badgeContent={vote_average}
          color={vote_average >= 7 ? "primary" : "secondary"}
          overlap="rectangular"
        >
          <img
            className="poster"
            src={poster ? `${img_300}/${poster}` : unavailable}
            alt={title}
          />
        </Badge>
        <p className="title">
          <strong>{title}</strong>
        </p>
        <div className="subTitle">
          {media_type === "tv" ? "Tv" : "Movie"}
          <div className="subTitle">{date}</div>
        </div>
      </ContentModal>
    </Link>
  );
};

export default SingleContent;
