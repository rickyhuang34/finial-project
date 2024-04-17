import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import axios from "axios";
import { img_500, unavailable, unavailableLandscape } from "../Config/Config";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./ContentModal.css";
import Gallery from "./Carousel/Carousel";

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);

  const [content, setContent] = useState();

  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    // console.log("Fetched data:", data);

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key); //什么写法
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div type="button" className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className="paper">
              {" "}
              <div className="ContentModal">
                <img
                  alt={content.name || content.title}
                  className="Content_portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                />
                <img
                  alt={content.name || content.title}
                  className="ContentModal_landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                />

                <div className="ContentModal_about">
                  <div className="ContentModal_title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "----"
                    ).substring(0, 4)}
                    )
                  </div>

                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <div className="ContentModal_description">
                    {content.overview}
                  </div>

                  <div>
                    <Gallery media_type={media_type} id={id} />
                  </div>

                  {/* <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button> */}
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
