import React from "react";
import {Link} from "react-router-dom"

function Topbar() {
  return (

          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* Sidebar Toggle (Topbar) */}
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i className="fa fa-bars" />
            </button>
            {/* Topbar Search */}
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form>
            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
              {/* Nav Item - Search Dropdown (Visible Only XS) */}
              <li className="nav-item dropdown no-arrow d-sm-none">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="searchDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-search fa-fw" />
                </Link>
                {/* Dropdown - Messages */}
                <div
                  className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                  <form className="form-inline mr-auto w-100 navbar-search">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fas fa-search fa-sm" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
              {/* Nav Item - Alerts */}
              <li className="nav-item dropdown no-arrow mx-1">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="alertsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell fa-fw" />
                  {/* Counter - Alerts */}
                  <span className="badge badge-danger badge-counter"></span>
                  {/* <span className="badge badge-danger badge-counter">3+</span> */}
                                  </Link>                
              </li>
              
              <div className="topbar-divider d-none d-sm-block" />
              {/* Nav Item - User Information */}
              <li className="nav-item dropdown no-arrow">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {/*$$$ User Name */} User Name 
                  </span>
                  <img
                    className="img-profile rounded-circle"
                    src="assets/img/undraw_profile.svg"
                    alt="..."
                  />
                </Link>
                
              </li>
            </ul>
          </nav>
          
      
  );
}

export default Topbar;