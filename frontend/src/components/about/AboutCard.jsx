import React, { useEffect, useState } from "react"
import Heading from "../common/heading/Heading"
import "./about.css"
import axios from "axios";


const AboutCard = () => {

  const [about, setAbout] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/about").then((result) => {
      setAbout(result.data);
    });
  }, []);
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='right row'>
            <Heading  title='About Department' />
            <div className='items'>
              {about.map((val) => {
                return (
                  <div className='item'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutCard
