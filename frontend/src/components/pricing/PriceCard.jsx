import React, { useEffect, useState } from "react";
import axios from "axios";


const PriceCard = () => {
  const [resultData, setResult] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/results").then((result) => {
      setResult(result.data);
    });
  }, []);


  const [timetableData, setTimetables] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/timetables").then((result) => {
      setTimetables(result.data);
    });
  }, []);

  const [callenderData, setCallender] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/callender").then((result) => {
      setCallender(result.data);
    });
  }, []);


  return (
    <>
      <div className="price-container">
        <div className="bulletin-board">
          <center>
            <h2>Result Links</h2>
          </center>
          <div>
            <table className="academic-calendar-table">
              {/* Add a class name for styling */}
              <tbody>
                {resultData.map((detail, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href={detail.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {detail.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="bulletin-board">
          <center>
            <h2>Time Table Links</h2>
          </center>
          <div>
            <table className="academic-calendar-table">
              {/* Add a class name for styling */}
              <tbody>
                {timetableData.map((detail, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href={detail.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {detail.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="bulletin-board">
        <div>
          <center><h2>Academic Calendar Details</h2></center>
          <table className="academic-calendar-table">
            {" "}
            {/* Add a class name for styling */}
            <thead>
              <tr>
                <th>S No</th>
                <th>Academic Year</th>
                <th>Course</th>
                <th>Attachment</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {callenderData.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.sno}</td>
                  <td>{detail.academicYear}</td>
                  <td>{detail.course}</td>
                  <td>
                    <a href={detail.url}>{detail.attachment}</a>
                  </td>
                  <td>{detail.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PriceCard;
