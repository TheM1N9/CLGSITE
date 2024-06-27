import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Head from "./Head"
import "./fheader.css";

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <div className="fcontainer fflexSB">
        <div className="header">
          <nav className="fflexSB">
            <ul
              className={click ? "mobile-nav" : "flexSB "}
              onClick={() => setClick(false)}
            >
              <li>
                <Link to="profiles">Faculty profiles</Link>
              </li>
              <li>
                <Link to="publications">Faculty Publications</Link>
              </li>
              <li>
                <Link to="acheivements">Faculty Achievements</Link>
              </li>
              <li>
                <Link to="innovations">Faculty innovations</Link>
              </li>
              <li>
                <Link to="participation">Faculty participations</Link>
              </li>
              <li>
                <Link to="teachingaids">Faculty Teaching Aids</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
