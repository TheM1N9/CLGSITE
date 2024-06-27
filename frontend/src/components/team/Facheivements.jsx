import React, { useEffect, useState } from "react";
import "./achievements.css";
import PDFDownloadButton from "../allcourses/PDFDownloadButton";
import axios from "axios";

export default function Facheivements() {
  const [acchpdfData, setAcchpdf] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/acchpdf").then((result) => {
      setAcchpdf(result.data);
    });
  }, []);

  const [acchdataData, setAcchdata] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/acchdata").then((result) => {
      setAcchdata(result.data);
    });
  }, []);

  const [acchcolData, setAcchcol] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/acchcol").then((result) => {
      setAcchcol(result.data);
    });
  }, []);

  return (
    <div>
      <center>
        <div className="academic-summary-table-container">
          <br />
          <h2>Achievements</h2>
          <br />
          {acchpdfData.map((item, index) => (
            <div key={index}>
              <PDFDownloadButton pdfUrl={item.link} cname={item.name} />
            </div>
          ))}

          <br />
          <h2>Summary of Achievements</h2>
          <br />
          <table className="academic-summary-table">
            <thead>
              <tr>
                {acchcolData.length > 0 &&
                  Object.values(acchcolData[0]).slice(1).map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {acchdataData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).slice(1).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </div>
      </center>
    </div>
  );
}
