import React from 'react';
import image1 from "./Bookpicture/01.jpg";
import image2 from "./Bookpicture/02.jpg";
import image3 from "./Bookpicture/03.jpg";
import image4 from "./Bookpicture/04.jpg";
import image5 from "./Bookpicture/05.jpg";
import image6 from "./Bookpicture/06.jpg";
import image7 from "./Bookpicture/07.jpg";
import image8 from "./Bookpicture/08.jpg";
import image9 from "./Bookpicture/09.jpg";
import image10 from "./Bookpicture/10.jpg";
import "./AnimatedCarousel.css";

const AnimatedCarousel = () => {
  return (
    <div>
      <div className='scroll-container' style={{ '--time': '18s' }}>
        <div>
          <div>
            <img src={image5} alt='image5'/>
          </div>
          <div>
            <img src={image2} alt='image2'/>
          </div>
          <div>
            <img src={image3} alt='image3'/>
          </div>
          <div>
            <img src={image1} alt='image1'/>
          </div>
          <div>
            <img src={image4} alt='image4'/>
          </div>
          <div>
            <img src={image8} alt='image8'/>
          </div>
          <div>
            <img src={image6} alt='image6'/>
          </div>
          <div>
            <img src={image7} alt='image7'/>
          </div>
          <div>
            <img src={image9} alt='image9'/>
          </div>
          <div>
            <img src={image10} alt='image10'/>
          </div>
        </div>
      </div>

      <div className='scroll-container' style={{ '--time': '25s' }}>
        <div>
          <div>
            <img src={image10} alt='image10'/>
          </div>
          <div>
            <img src={image3} alt='image3'/>
          </div>
          <div>
            <img src={image2} alt='image2'/>
          </div>
          <div>
            <img src={image4} alt='image4'/>
          </div>
          <div>
            <img src={image5} alt='image5'/>
          </div>
          <div>
            <img src={image7} alt='image7'/>
          </div>
          <div>
            <img src={image6} alt='image6'/>
          </div>
          <div>
            <img src={image9} alt='image9'/>
          </div>
          <div>
            <img src={image1} alt='image1'/>
          </div>
          <div>
            <img src={image8} alt='image8'/>
          </div>
        </div>
      </div>

      <div className='scroll-container' style={{ '--time': '22s' }}>
        <div>
          <div>
            <img src={image1} alt='image1'/>
          </div>
          <div>
            <img src={image2} alt='image2'/>
          </div>
          <div>
            <img src={image3} alt='image3'/>
          </div>
          <div>
            <img src={image4} alt='image4'/>
          </div>
          <div>
            <img src={image5} alt='image5'/>
          </div>
          <div>
            <img src={image6} alt='image6'/>
          </div>
          <div>
            <img src={image7} alt='image7'/>
          </div>
          <div>
            <img src={image8} alt='image8'/>
          </div>
          <div>
            <img src={image9} alt='image9'/>
          </div>
          <div>
            <img src={image10} alt='image10'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCarousel;