// import { testimonal } from "../../../dummydata";
import Heading from "../../common/heading/Heading";
import "./style.css";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import axios from "axios";

const Testimonal = () => {

  const [alumniData, setAlumni] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/alumni").then((result) => {
      setAlumni(result.data);
    });
  }, []);
  return (
    <>
      <section className="testimonal padding">
        <div className="container">
          <Heading title="Our Alumni" />

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
            {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide> */}

            <div className="content tgrid2">
              {alumniData.map((val) => (
                <SwiperSlide>
                  <div className="items shadow">
                    <div className="box flex">
                      <div className="img">
                        <img src={val.cover} alt="" />
                        <i className="fa fa-quote-left icon"></i>
                      </div>
                      <div className="name">
                        <h2>{val.name}</h2>
                        <span>{val.post}</span>
                      </div>
                    </div>
                    <p>{val.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>

          {/* <div className='content tgrid2'>
            {testimonal.map((val) => (
              <div className='items shadow'>
                <div className='box flex'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{val.name}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p>{val.desc}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Testimonal;
