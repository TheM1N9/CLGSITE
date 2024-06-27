import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [click, setClick] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get(`http://localhost:3001/api/users/username/${username}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data:", error);
      });
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { permissions } = userData;

  return (
    <div className="admin">
      <div className={`sidebar ${click ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <ul>
            {permissions.events && (
              <li>
                <Link to="event" onClick={() => setClick(false)}>
                  Events
                </Link>
              </li>
            )}
            {permissions.results && (
              <li>
                <Link to="result" onClick={() => setClick(false)}>
                  Results
                </Link>
              </li>
            )}
            {permissions.timetable && (
              <li>
                <Link to="timetable" onClick={() => setClick(false)}>
                  Timetable
                </Link>
              </li>
            )}
            {permissions.teachingFaculty && (
              <li>
                <Link to="teachingfaculty" onClick={() => setClick(false)}>
                  Teaching Faculty
                </Link>
              </li>
            )}
            {permissions.techFaculty && (
              <li>
                <Link to="techfaculty" onClick={() => setClick(false)}>
                  Technical Faculty
                </Link>
              </li>
            )}
            {permissions.syllabus && (
              <li>
                <Link to="syllabus" onClick={() => setClick(false)}>
                  Syllabus
                </Link>
              </li>
            )}
            {permissions.calendar && (
              <li>
                <Link to="calendar" onClick={() => setClick(false)}>
                  Calendar
                </Link>
              </li>
            )}
            {permissions.images && (
              <li>
                <Link to="carouselimages" onClick={() => setClick(false)}>
                  Images
                </Link>
              </li>
            )}
            {permissions.publications && (
              <li>
                <Link to="publications" onClick={() => setClick(false)}>
                  Publications
                </Link>
              </li>
            )}
            {permissions.achievements && (
              <li>
                <Link to="achievements" onClick={() => setClick(false)}>
                  Achievements
                </Link>
              </li>
            )}
            {permissions.participations && (
              <li>
                <Link to="participations" onClick={() => setClick(false)}>
                  Participations
                </Link>
              </li>
            )}
            {permissions.placements && (
              <li>
                <Link to="placements" onClick={() => setClick(false)}>
                  Placements
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <button className="sidebar-toggle" onClick={() => setClick(!click)}>
        {click ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
      </button>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
