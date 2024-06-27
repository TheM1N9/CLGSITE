import React, { useEffect, useState } from "react";
import "./courses.css";
import axios from "axios";

const CoursesCard = () => {
  const downloadPdf = (url) => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    // Trigger the click event to start the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [syllabusData, setSyllabus] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:3001/syllabus").then((result) => {
        setSyllabus(result.data);
      });
    }, []);
  return (
    <>
      <section className="coursesCard">
        <div className="container grid2">
          {syllabusData.map((val, index) => (
            <div key={index} className="items">
              <div className="content flex">
                <div className="text">
                  <h1>{val.coursesName}</h1>
                </div>
              </div>
              <div>
                <div className="details">
                  {val.courTeacher.map((details, detailsIndex) => (
                    <div key={detailsIndex}>
                      {Object.keys(details).map((key) => (
                        <div key={key}>
                          {Array.isArray(details[key]) &&
                            details[key].map((item, itemIndex) => (
                              <div key={itemIndex}>
                                <br />
                                <button
                                  className="outline-btn"
                                  onClick={() => downloadPdf(item.url)}
                                >
                                  {item.name}{" "}
                                </button>
                                <br />
                                <br />
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </section>
    </>
  );
};

export default CoursesCard;
