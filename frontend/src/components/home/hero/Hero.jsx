import "./Hero.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/scrollbar";
import axios from "axios";

const Hero = () => {
  const [cimageData, setImages] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/cimages").then((result) => {
      setImages(result.data);
    });
  }, []);
  return (
    <>
      <section className="hero">
        <div className="carousel-container">
          <Carousel autoPlay infiniteLoop showThumbs={false} swipeable>
            {cimageData.map((image, index) => (
              <div key={index}>
                <img src={image.src} alt={image.src} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      <div className="heromargin"></div>
    </>
  );
};

export default Hero;
