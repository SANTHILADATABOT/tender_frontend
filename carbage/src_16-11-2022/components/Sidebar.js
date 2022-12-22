import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Sidebar() {

 
  const [active, setActive] = useState("");

  const pathName = "tender";

  const hideSidebarElement = (menuId,tab) => {
    document.getElementById(menuId).click();
    setActive(tab)
  }

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <Link
        to="/"
        className="sidebar-brand d-flex align-items-center justify-content-center"
      >
        <div className="sidebar-brand-icon">
          <img
            src="assets/icons/logo.png"
            width="70"
            height="70"
            className="mt-2"
            alt="..."
          />
        </div>
        <div className="sidebar-brand-text mx-3">Zigma</div>
      </Link>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item">
        <Link className="nav-link" to="/tender">
          {/*<i className="fas fa-fw fa-tachometer-alt" />*/}
          <i class="fa fa-laptop"></i>
          <span className="ml-1">Dashboard</span>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseTenderMenu"
          aria-expanded="true"
          aria-controls="collapseTenderMenu"
          id = "tenderMenu"
        >
          {/*<i className="fas fa-fw fa-cog" />*/}
          <i class="fa fa-gavel" ></i>
          <span className="font-weight-bold ml-1">Tenders</span>
        </Link>
        <div
          id="collapseTenderMenu"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className={`collapse-item ${active === "tab1"? "active":""}`} to={`/${pathName}/tendercreation`} onClick = {() => hideSidebarElement("tenderMenu", "tab1")}>
              Tender Creation
            </Link>
            <Link className={`collapse-item ${active === "tab2"? "active":""}`} to={`/${pathName}/tendertracker`} onClick = {() => hideSidebarElement("tenderMenu", "tab2")}>
              Tender Tracker
            </Link>
            <Link className={`collapse-item ${active === "tab3"? "active":""}`} to={`/${pathName}/legacystatement`} onClick = {() => hideSidebarElement("tenderMenu","tab3")}>
              Legacy Statement
            </Link>
            <Link className={`collapse-item ${active === "tab4"? "active":""}`} to={`/${pathName}/test/2`} onClick = {() => hideSidebarElement("tenderMenu", "tab4")}>
              Bid's Management
            </Link>
          </div>
        </div>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item ">
        <Link className="nav-link" to="/tender/master">
          {/*<i className="fas fa-fw fa-tachometer-alt" />*/}
          <i class="fa fa-graduation-cap"></i>
          <span className="ml-1">Master</span>
        </Link>
      </li>
      

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    

    </ul>
  );
}

export default Sidebar;
