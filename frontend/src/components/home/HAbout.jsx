// import OnlineCourses from "../allcourses/OnlineCourses";
// import Heading from "../common/heading/Heading"
import "../allcourses/courses.css";
// import { events } from "../../dummydata";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import axios from "axios";
// import PDFDownloadButton from "../allcourses/PDFDownloadButton";

const HAbout = () => {

  const [eventData, setEvent] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/event").then((result) => {
      setEvent(result.data);
    });
  }, []);
  return (
    <>
      <div className="events">
        <br />
        <br />
        <h2>
          <i className="fa fa-graduation-cap"></i> Our Events
        </h2>

        <div className="card-wrapper">
          <br />
          <br />

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
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {eventData.map((val) => {
              return (
                <SwiperSlide>
                  <div className="card">
                    <div className="card-img">
                      <img src={`data:image/jpeg;base64,${val.img}`} alt="" />
                    </div>
                    <div className="card-text">
                      <h3>{val.title}</h3>
                      <p>{val.description}</p>
                      <strong>{val.time}</strong>
                      <div className="date">
                        <strong>{val.day}</strong>
                        <p>{val.monthyear}</p>
                        
                      </div>
                      <a href={val.url}><button className="ebutton"> Register </button></a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* <OnlineCourses /> */}
    </>
  );
};

export default HAbout;
