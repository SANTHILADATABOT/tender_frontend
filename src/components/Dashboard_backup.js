import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../storeAuth/auth-context";


function Dashboard() {

  const authCtx = useContext(AuthContext);
 
    // const authCtx = useContext(AuthContext);
  
  
   
  return (
          
<>
            {/* Page Heading */}
            
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              
            </div>
            
            <div className="row">
              {/* Content Row */}  
              <div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xl font-weight-bold text-primary text-uppercase mb-1">
                          Live Tenders
                        </div>
                        <div className="h2 mb-0 font-weight-bold text-gray-800">
                          50
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xl font-weight-bold text-success text-uppercase mb-1">
                          Fresh Tenders
                        </div>
                        <div className="h2 mb-0 font-weight-bold text-gray-800">
                          2
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-4 col-md-6 mb-4 ">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col pl-3 ">
                        <div className="text-xl font-weight-bold text-info text-uppercase mb-1">
                          Awarded Tenders
                        </div>
                          <div className="h2 mb-0 font-weight-bold text-gray-800 ">
                          5
                        </div>
                      </div>
                      <div className="col-auto">
                         <i className="fas fa-dollar-sign fa-2x text-gray-300" /> 
                        {/* <img src="assets/icons/tender_awarded1.png" alt="" width="50" height="50" className="mb-1 text-gray-300"/>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
            
            </>
  );
}

export default Dashboard;
