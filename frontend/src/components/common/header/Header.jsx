import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const [homeHover, setHomeHover] = useState(false);
  const [facultyHover, setFacultyHover] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const headerOffset = header.offsetTop;
      if (window.pageYOffset > headerOffset) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    console.log("Logging out...");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  const isFacultyActive = () => {
    const facultyPaths = [
      "/faculty",
      "/faculty/profiles",
      "/faculty/publications",
      "/faculty/achievements",
      "/faculty/innovations",
      "/faculty/participation",
      "/faculty/teachingaids",
    ];
    return facultyPaths.includes(location.pathname) ? "active-link" : "";
  };

  return (
    <>
      <div className="banner">
        <h2 className="banner-heading">Anil Neerukonda Institute Of Technology and Sciences
        </h2>
        <h5 className="banner-heading2">
          Autonomous status accorded by UGC and Andhra University<br/>
          Approved by AICTE, Permanently Affiliated to Andhra University<br/>
          Accredited by NBA (ECE,EEE,CSE,IT,MECH,CIVIL & CHEMICAL) & NAAC
        </h5>
        <h2 className="banner-heading3">Department of Computer Science and Engineering(AI & ML, Data Science)
        </h2>
        <img src="/images/banner.png" alt="Banner" />
      </div>
      <header className={isFixed ? "fixed-header" : ""}>
        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
            <li className="dropdown" onMouseEnter={() => setHomeHover(true)} onMouseLeave={() => setHomeHover(false)}>
              <Link to="/" className={isActive("/")}>
                Home {homeHover ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <ScrollLink to="scrollabout" smooth={true} duration={500}>
                    About
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to="scrollevent" smooth={true} duration={500}>
                    Events
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to="scrollinventum" smooth={true} duration={500}>
                    Inventum
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to="scrollalumni" smooth={true} duration={500}>
                    Alumni
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to="scrolldropdown" smooth={true} duration={500}>
                    Dropdown
                  </ScrollLink>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/academics" className={isActive("/academics")}>
                Academics
              </Link>
            </li>
            <li className={`dropdown ${isFacultyActive()}`} onMouseEnter={() => setFacultyHover(true)} onMouseLeave={() => setFacultyHover(false)}>
              <Link to="/faculty" className={isFacultyActive()}>
                Faculty {facultyHover ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/faculty/profiles" className={isActive("/faculty/profiles")}>
                    Profiles
                  </Link>
                </li>
                <li>
                  <Link to="/faculty/publications" className={isActive("/faculty/publications")}>
                    Publications
                  </Link>
                </li>
                <li>
                  <Link to="/faculty/achievements" className={isActive("/faculty/achievements")}>
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link to="/faculty/innovations" className={isActive("/faculty/innovations")}>
                    Innovations
                  </Link>
                </li>
                <li>
                  <Link to="/faculty/participation" className={isActive("/faculty/participation")}>
                    Participations
                  </Link>
                </li>
                <li>
                  <Link to="/faculty/teachingaids" className={isActive("/faculty/teachingaids")}>
                    Teaching Aids
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/updates" className={isActive("/updates")}>
                Updates
              </Link>
            </li>
            {username ? (
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            ) : (
              <></>
            )}
          </ul>

          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
