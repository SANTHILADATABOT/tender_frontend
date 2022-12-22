import React from "react";
import {  Outlet } from "react-router-dom";



function Pagewrapper() {
  return (
    <div className="container-fluid">
      <Outlet />
    </div>
  );
}

export default Pagewrapper;
