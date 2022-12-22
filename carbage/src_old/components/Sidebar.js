import React from "react";
import { Link , useLocation} from "react-router-dom";


function Sidebar() {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1]
 
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
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          {/*<i className="fas fa-fw fa-tachometer-alt" />*/}
          <img
            src="assets/icons/dashboard3.png"
            alt=""
            width="25"
            height="25"
            className="mb-1"
          />
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
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          {/*<i className="fas fa-fw fa-cog" />*/}
          <img
            src="assets/icons/auction.png"
            alt=""
            width="30"
            height="30"
            className="mb-1"
          />
          <span className="font-weight-bold">Tenders</span>
        </Link>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to={`/${pathName}/tendercreation`}>
              Tender Creation
            </Link>
            <Link className="collapse-item" to={`/${pathName}/tendertracker`}>
              Tender Tracker
            </Link>
            <Link className="collapse-item" to={`/${pathName}/legacystatement`}>
              Legacy Statement
            </Link>
            <Link className="collapse-item" to={`/${pathName}/test/2`}>
              Bid's Management
            </Link>
          </div>
        </div>
      </li>

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
}

export default Sidebar;
