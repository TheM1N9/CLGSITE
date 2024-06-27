import React, { useState, useEffect } from "react";
import axios from "axios";
import "./popup.css";

const Popup = () => {
  const [show, setShow] = useState(true);
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [placementsRes] = await Promise.all([
          axios.get("http://localhost:3001/placements"),
        ]);

        setPlacements(placementsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 20000); // Automatically hide after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  // Sort placements by package in descending order
  const sortedPlacements = placements.sort((a, b) => b.package - a.package);

  return (
    show && (
        <div className="toast">
          <div className="toast-header">
            <h4>Placements Updates</h4>
            <button className="close-btn" onClick={() => setShow(false)}>
              ×
            </button>
          </div>

          <div className="placement-data">
            <ul>
              {sortedPlacements.map((placement, index) => (
                <li key={index}>
                  {placement.company}: {placement.package} LPA (Packages:{" "}
                  {placement.count})
                </li>
              ))}
            </ul>
          </div>
        </div>
    )
  );
};

export default Popup;
