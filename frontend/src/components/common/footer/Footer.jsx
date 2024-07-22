import React, { useEffect, useState } from "react";
import "./footer.css";
import axios from "axios";

const Footer = () => {
  const [resultData, setResult] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/results").then((result) => {
      setResult(result.data);
    });
  }, []);

  const [quicklinks, setQuicklinks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/quicklinks").then((result) => {
      setQuicklinks(result.data);
    });
  }, []);

  const [sociallinks, setSociallinks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/sociallinks").then((result) => {
      setSociallinks(result.data);
    });
  }, []);
  return (
    <>
      <footer>
        <center>
          <br />
          <img
            src={process.env.PUBLIC_URL + '/images/anits_logo.png'}
            style={{ width: "170px", height: "auto" }}
            alt="rgaersg"
          />
        </center>
        <div className="container padding">
          <div className="box logo">
            <h1>ANITS</h1>
            <span>ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY AND SCIENCES</span>
            <p className="fp">PRAGNANAM BRAHMA</p>
            {/* <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-twitter icon"></i>
            <i className="fab fa-instagram icon"></i> */}
            {sociallinks.map((val) => (
              <span>
                <label htmlFor="">
                  <a href={val.url} target="_blank" rel="noreferrer">
                    <i className={val.name}></i>
                  </a>
                </label>
              </span>
            ))}
            <br /> <br />
            <br />
            <h3>Working Day & time</h3>
            <ul>
              <p className="fp">Monday - Friday : 8:40 AM - 4:10 PM</p>
              <p className="fp">Saturday : 8:40 AM - 12:00 PM</p>
              <p className="fp">Sunday : Closed</p>
            </ul>
          </div>
          <div className="box link">
            <h3>Quick Links</h3>
            <ul>
              {quicklinks.map((val) => (
                <li>
                  <a href={val.url} target="_blank" rel="noreferrer">
                    {val.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="box rlink">
            <h3>Recent Updates</h3>
            {resultData.slice(0, 6).map((val) => (
              <div className="items flexSB">
                <div className="text">
                  <span>
                    <i className="fa fa-search"></i>
                    <label htmlFor="">
                      <a href={val.url} target="_blank" rel="noreferrer">
                        {val.name}
                      </a>
                    </label>
                  </span>
                  {/* <h4>{val.title.slice(0, 40)}...</h4> */}
                </div>
              </div>
            ))}
          </div>
          <div className="box last">
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className="fa fa-map-marker-alt"></i>
                  <iframe
                    width="100%"
                    height="300"
                    frameborder="0"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=300%25&amp;height=100&amp;hl=en&amp;q=Anil%20Neerukonda%20Institute%20of%20Techonology%20and%20Sciences%20(ANITS)%20Near%20Three%20Temples%20Bheemunipatnam,%20Sanghivalasa,%20Visakhapatnam,%20Andhra%20Pradesh%20531162&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                  </iframe>
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                7330789893 , 9154220250
              </li>
              <li>
                <i className="fa fa-paper-plane"></i>
                principal@anits.edu.in
              </li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <p>
            Copyright © 2001 - 2023 ANITS - All Rights Reserved. Made by
            ANITS-Web Team
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
