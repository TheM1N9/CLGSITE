import React, { useEffect, useState } from "react";
import "./publication.css";
import PDFDownloadButton from "../allcourses/PDFDownloadButton";
import axios from "axios";

export default function FacultyPublications() {
  const [pubpdfData, setPubpdf] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/pubpdf").then((result) => {
      setPubpdf(result.data);
    });
  }, []);

  const [pubdataData, setPubdata] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/pubdata").then((result) => {
      setPubdata(result.data);
    });
  }, []);

  const [pubcolData, setPubcol] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/pubcol").then((result) => {
      setPubcol(result.data);
    });
  }, []);

  return (
    <div>
      <center>
        <div className="publication-summary-table-container">
          <br /><h2>Publications</h2><br />
          {pubpdfData.map((item, index) => (
            <div key={index}>
              <PDFDownloadButton pdfUrl={item.link} cname={item.name} />
            </div>
          ))}
          <br />
          <h2>Summary of Publications</h2>
          <br />
          <table className="publication-summary-table">
            <thead>
              <tr>
                {pubcolData.length > 0 &&
                  Object.values(pubcolData[0]).slice(1).map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {pubdataData.map((row, rowIndex) => (
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
          <br />
        </div>
      </center>
    </div>
  );
}
