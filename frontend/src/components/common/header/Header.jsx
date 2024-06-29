import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const location = useLocation();

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
      "/faculty/teachingaids"
    ];
    return facultyPaths.includes(location.pathname) ? "active-link" : "";
  };

  return (
    <>
      {/* <section className="head">
        <div className="container flexSB">
          <div className="anits">
            <img
              src="https://anits.edu.in/icaesct2022/images/anits_logo_b.png"
              style={{ width: "80px", height: "auto" }}
              alt="ANITS Logo"
            />
            <div className="logo">
              <h1>CSE(AI & ML, DS)</h1>
              <span>ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY AND SCIENCES</span>
            </div>
          </div>

          <header>
            <nav className="flexSB">
              <ul
                className={click ? "mobile-nav" : "flexSB"}
                onClick={() => setClick(false)}
              >
                <li 
                  className="dropdown"
                  onMouseEnter={() => setClick(true)}
                  onMouseLeave={() => setClick(false)}
                >
                  <Link to="/" className={isActive("/")}>
                    Home {click ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <ScrollLink to="scrollabout" smooth={true} duration={500}>About</ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="scrollevent" smooth={true} duration={500}>Events</ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="scrollinventum" smooth={true} duration={500}>Inventum</ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="scrollalumni" smooth={true} duration={500}>Alumni</ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="scrolldropdown" smooth={true} duration={500}>Dropdown</ScrollLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/academics" className={isActive("/academics")}>Academics</Link>
                </li>
                <li 
                  className={`dropdown ${isFacultyActive()}`}
                  onMouseEnter={() => setClick(true)}
                  onMouseLeave={() => setClick(false)}
                >
                  <Link to="/faculty" className={isFacultyActive()}>
                    Faculty {click ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/faculty/profiles" className={isActive("/faculty/profiles")}>Profiles</Link>
                    </li>
                    <li>
                      <Link to="/faculty/publications" className={isActive("/faculty/publications")}>Publications</Link>
                    </li>
                    <li>
                      <Link to="/faculty/acheivements" className={isActive("/faculty/achievements")}>Achievements</Link>
                    </li>
                    <li>
                      <Link to="/faculty/innovations" className={isActive("/faculty/innovations")}>Innovations</Link>
                    </li>
                    <li>
                      <Link to="/faculty/participation" className={isActive("/faculty/participation")}>Participations</Link>
                    </li>
                    <li>
                      <Link to="/faculty/teachingaids" className={isActive("/faculty/teachingaids")}>Teaching Aids</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/updates" className={isActive("/updates")}>Updates</Link>
                </li>
                {username ? (
                  <li>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                  </li>
                ) : (
                  <></>
                )}
              </ul>

              <button className="toggle" onClick={() => setClick(!click)}>
                {click ? (
                  <i className="fa fa-times"></i>
                ) : (
                  <i className="fa fa-bars"></i>
                )}
              </button>
            </nav>
          </header>
        </div>
      </section> */}
      <div className="banner">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fback_origin_pic%2F03%2F99%2F90%2Fd410800f7d7d328ffaf95e5b49fada7d.jpg&f=1&nofb=1&ipt=c4f7f5203d4964369e91692afe8112a3141d4aa9b4096ba651b274f0909b2c2e&ipo=images" alt="" srcset="" />
        <header>
            <nav className="flexSB">
              <ul
                className={click ? "mobile-nav" : "flexSB"}
                onClick={() => setClick(false)}
              >
                <li 
                  className="dropdown"
                  onMouseEnter={() => setClick(true)}
                  onMouseLeave={() => setClick(false)}
                >
                  <Link to="/" className={isActive("/")}>
                    Home {click ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <ScrollLink to="scrollabout" smooth={true} duration={500}>About</ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="scrollevent" smooth={true} duration={500}>Events</ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="scrollinventum" smooth={true} duration={500}>Inventum</ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="scrollalumni" smooth={true} duration={500}>Alumni</ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="scrolldropdown" smooth={true} duration={500}>Dropdown</ScrollLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/academics" className={isActive("/academics")}>Academics</Link>
                </li>
                <li 
                  className={`dropdown ${isFacultyActive()}`}
                  onMouseEnter={() => setClick(true)}
                  onMouseLeave={() => setClick(false)}
                >
                  <Link to="/faculty" className={isFacultyActive()}>
                    Faculty {click ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/faculty/profiles" className={isActive("/faculty/profiles")}>Profiles</Link>
                    </li>
                    <li>
                      <Link to="/faculty/publications" className={isActive("/faculty/publications")}>Publications</Link>
                    </li>
                    <li>
                      <Link to="/faculty/acheivements" className={isActive("/faculty/achievements")}>Achievements</Link>
                    </li>
                    <li>
                      <Link to="/faculty/innovations" className={isActive("/faculty/innovations")}>Innovations</Link>
                    </li>
                    <li>
                      <Link to="/faculty/participation" className={isActive("/faculty/participation")}>Participations</Link>
                    </li>
                    <li>
                      <Link to="/faculty/teachingaids" className={isActive("/faculty/teachingaids")}>Teaching Aids</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/updates" className={isActive("/updates")}>Updates</Link>
                </li>
                {username ? (
                  <li>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                  </li>
                ) : (
                  <></>
                )}
              </ul>

              <button className="toggle" onClick={() => setClick(!click)}>
                {click ? (
                  <i className="fa fa-times"></i>
                ) : (
                  <i className="fa fa-bars"></i>
                )}
              </button>
            </nav>
          </header>  
      </div>
    </>
  );
};

export default Header;
