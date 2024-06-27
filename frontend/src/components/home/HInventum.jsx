import React, { useEffect, useState } from "react";
import "./HInventum.css";
import axios from "axios";
// import { inventum } from "../../dummydata";

const HInventum = () => {
  const [festData, setFest] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/fest").then((result) => {
      setFest(result.data);
    });
  }, []);
  return (
    <>
      <div class="inventum">
        {festData.map((val) => (
          <div class="inventum123">
            <div class="i2k24">
              <h2>{val.title}</h2>
              <a href={val.link}>
                <img src={val.image} alt="" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* <OnlineCourses /> */}
    </>
  );
};

export default HInventum;
