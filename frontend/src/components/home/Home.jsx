import React from "react";
import AboutCard from "../about/AboutCard";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import HInventum from "./HInventum";
import Dropdown from "./dropdown/Hdropdown";
import Testimonal from "./testimonal/Testimonal";

const Home = () => {
  return (
    <>
      <Hero />
      <div id="scrollabout"><AboutCard /></div>
      <div id="scrollevent"><HAbout /></div>
      <div id="scrollinventum"><HInventum /></div>
      <div id="scrollalumni"><Testimonal /></div>
      <div id="scrolldropdown"><Dropdown /></div>
      {/* <Hprice /> */}
    </>
  )
}

export default Home;
