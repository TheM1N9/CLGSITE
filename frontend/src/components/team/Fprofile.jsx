// import { tech_team } from "../../dummydata";
import TeamCard from "./TeamCard";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import axios from "axios";

export default function Fprofile() {
  const [techData, setTech] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/tech").then((result) => {
      setTech(result.data);
    });
  }, []);
  return (
    <>
      <center>
        <br />
        <br />
        <h2 className="fph2">Teaching Staff</h2>
      </center>
      <section className="team padding">
        <TeamCard />
      </section>
      <br />
      <section className="team padding">
        <center>
          <h2>TECH STAFF</h2>
        </center>
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
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {techData.map((val) => (
            <SwiperSlide>
              <div className="items shadow">
                <div className="img">
                  <img src={`data:image/jpeg;base64,${val.cover}`} alt="" />
                  <div className="overlay">
                    {/* <i className="fab fa-facebook-f icon"></i>
                  <i className="fab fa-twitter icon"></i>
                  <i className="fab fa-instagram icon"></i>
                  <i className="fab fa-tiktok icon"></i> */}
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
      </section>
    </>
  );
}
