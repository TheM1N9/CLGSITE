import React from "react";
import Back from "../common/back/Back";
import "./team.css";
import "../about/about.css";
import FHeader from "./fheader/FHeader";
import { Outlet } from "react-router-dom";

const Team = () => {
  return (
    <>
      <Back title="Faculty Details" />
      <FHeader />
      <Outlet />
    </>
  );
};

export default Team;