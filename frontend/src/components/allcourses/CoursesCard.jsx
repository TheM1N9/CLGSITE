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
                              <>
                                {item.url !== "" && (
                                  <div key={itemIndex}>
                                    <br />
                                    <button
                                      className="outline-btn"
                                      onClick={() => {
                                        try {
                                          // Ensure syllabusItem.file is properly formatted
                                          const base64String =
                                            item.url.replace(
                                              /^data:application\/pdf;base64,/,
                                              ""
                                            );

                                          // Decode the base64 string
                                          const byteCharacters =
                                            atob(base64String);
                                          const byteNumbers = new Array(
                                            byteCharacters.length
                                          );
                                          for (
                                            let i = 0;
                                            i < byteCharacters.length;
                                            i++
                                          ) {
                                            byteNumbers[i] =
                                              byteCharacters.charCodeAt(i);
                                          }
                                          const byteArray = new Uint8Array(
                                            byteNumbers
                                          );
                                          const blob = new Blob([byteArray], {
                                            type: "application/pdf",
                                          });
                                          const url = URL.createObjectURL(blob);

                                          // Create a temporary anchor element to trigger download
                                          const a = document.createElement("a");
                                          a.style.display = "none";
                                          a.href = url;
                                          a.download = item.name; // Set the file name here
                                          document.body.appendChild(a);
                                          a.click();
                                          URL.revokeObjectURL(url);
                                          document.body.removeChild(a); // Clean up
                                        } catch (error) {
                                          console.error(
                                            "Error downloading PDF:",
                                            error
                                          );
                                          // Handle error - show an alert, log, or other error handling mechanism
                                        }
                                      }}
                                    >
                                      {item.name} (Download)
                                    </button>

                                    <br />
                                    <br />
                                  </div>
                                )}
                              </>
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
