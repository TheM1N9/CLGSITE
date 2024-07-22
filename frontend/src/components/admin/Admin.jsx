import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./admin.css";

export default function Admin() {
  const [click, setClick] = useState(false);

  return (
    <div className="admin">
      <div className={`sidebar ${click ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="event" onClick={() => setClick(false)}>Events</Link>
            </li>
            <li>
              <Link to="result" onClick={() => setClick(false)}>Results</Link>
            </li>
            <li>
              <Link to="timetable" onClick={() => setClick(false)}>Timetable</Link>
            </li>
            <li>
              <Link to="teachingfaculty" onClick={() => setClick(false)}>Teaching Faculty</Link>
            </li>
            <li>
              <Link to="techfaculty" onClick={() => setClick(false)}>Technical Faculty</Link>
            </li>
            <li>
              <Link to="syllabus" onClick={() => setClick(false)}>Syllabus</Link>
            </li>
            <li>
              <Link to="calendar" onClick={() => setClick(false)}>Calendar</Link>
            </li>
            <li>
              <Link to="carouselimages" onClick={() => setClick(false)}>Images</Link>
            </li>
            <li>
              <Link to="publications" onClick={() => setClick(false)}>Publications</Link>
            </li>
            <li>
              <Link to="achievements" onClick={() => setClick(false)}>Achievements</Link>
            </li>
            <li>
              <Link to="participations" onClick={() => setClick(false)}>Participations</Link>
            </li>
            <li>
              <Link to="placements" onClick={() => setClick(false)}>Placements</Link>
            </li>
            <li>
              <Link to="user-management" onClick={() => setClick(false)}>User Management</Link>
            </li>
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
