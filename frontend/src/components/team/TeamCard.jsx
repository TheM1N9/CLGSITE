// import { team } from "../../dummydata";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import axios from "axios";

const TeamCard = () => {
  const [teachData, setTeach] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/teach").then((result) => {
      setTeach(result.data);
    });
  }, []);
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {teachData.map((val) => (
          <SwiperSlide>
            <div className="items shadow">
              <div className="img">
                <img src={`data:image/jpeg;base64,${val.cover}`} alt="" />
                <div className="overlay">
                  {/* <i className="fab fa-facebook-f icon"></i>
              <i className="fab fa-twitter icon"></i>
              <i className="fab fa-instagram icon"></i> */}
                  <a href={val.url}>
                    <i className="fas fa-book"></i>
                  </a>
                </div>
              </div>
              <div className="details">
                <h2>{val.name}</h2>
                <p>{val.work}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TeamCard;
