import React from "react";
import YouTube from "react-youtube";
import "./Ftaids.css"; // Import the CSS file

const VideoPlayer = ({ videoId }) => {
  const opts = {
    height: "315",
    width: "560",
    playerVars: {
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default function Ftaids() {
  return (
    <>
      <div className="ftaids-container">
        <div className="video-section">
          <center>
            <h2>Teaching Aids</h2>
            <br />
            <br />
            <div className="video-wrapper">
              <div className="video-player">
                <VideoPlayer videoId="hdBR6GVkXLA?si=9wsLUyIfkDmhjE3d" />
                <br />
                <h2>DBMS by Dr.Ramakrishna</h2>
              </div>
              <div className="video-player">
                <VideoPlayer videoId="7HB_dxa0RLE?si=HBNGr_pOoscFXlSF" />
                <br />
                <h2>DCCN by Joshua Jhonson</h2>
              </div>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}
