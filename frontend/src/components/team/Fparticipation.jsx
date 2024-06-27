import React, { useEffect, useState } from "react";
import "./participation.css";
import PDFDownloadButton from "../allcourses/PDFDownloadButton";
import axios from "axios";

export default function Fparticipation() {
  const [partpdfData, setPartpdf] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/partpdf").then((result) => {
      setPartpdf(result.data);
    });
  }, []);

  const [partdataData, setPartdata] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/partdata").then((result) => {
      setPartdata(result.data);
    });
  }, []);

  const [partcolData, setPartcol] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/partcol").then((result) => {
      setPartcol(result.data);
    });
  }, []);

  return (
    <div>
      <div className="summary-participations-container">
        <center>
          <br />
          <h2>Participations</h2>
          <br />
          {partpdfData.map((item, index) => (
            <div key={index}>
              <PDFDownloadButton pdfUrl={item.link} cname={item.name} />
            </div>
          ))}

          <br />
          <h2>Summary of Participations</h2>
          <br />
          <table className="summary-participations-table">
            <thead>
              <tr>
                {partcolData.length > 0 &&
                  Object.values(partcolData[0]).slice(1).map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {partdataData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).slice(1).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <br />
        </center>
      </div>
    </div>
  );
}
