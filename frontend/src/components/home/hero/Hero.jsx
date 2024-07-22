import "./Hero.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
  const [cimageData, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/cimages")
      .then((result) => {
        setImages(result.data);
      })
      .catch((error) => {
        console.error("Error fetching carousel images:", error);
      });
  }, []);

  return (
    <>
      <section className="hero">
        <div className="carousel-container">
          {cimageData.length > 0 ? (
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              swipeable
            >
              {cimageData.map((image, index) => (
                <div key={index}>
                  <img
                    src={`data:image/jpeg;base64,${image.src}`}
                    alt={image.src}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <p>Loading carousel...</p>
          )}
        </div>
      </section>
      <div className="heromargin"></div>
    </>
  );
};

export default Hero;
