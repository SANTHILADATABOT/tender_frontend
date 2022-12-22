import React from "react";
import Topbar from "./Topbar";
import Pagewrapper from "./Pagewrapper";
import Footer from "./Footer";
function Contentwrapper() {
  return (
      <div id="content-wrapper" className="d-flex flex-column"> 
        <div id="content">
             <Topbar/>
             <Pagewrapper/>
        </div> 
        <Footer/>                 
      </div>
  
  );
}

export default Contentwrapper;
