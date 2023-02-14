import React, { useContext,useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../storeAuth/auth-context";
import { useBaseUrl } from "./hooks/useBaseUrl";
import axios from "axios";
import './logoicon.css';


function Dashboard() {
  const authCtx = useContext(AuthContext);
 
    // const authCtx = useContext(AuthContext);
  const { server1: baseUrl } = useBaseUrl();
  const[Live_tenders_count, setLive_tenders_count] = useState(0)
  const[fresh_tenders_count, setfresh_tenders_count] = useState(0)
  const[awarded_tenders_count, setawarded_tenders_count] = useState(0)
  // url: 'bidcreation/creation/live_tenders'

  axios.get(`${baseUrl}/api/bidcreation/creation/live_tenders`).then((resp) => {
    if(resp.data.live_tender_count){
      setLive_tenders_count(resp.data.live_tender_count)
    }
  })
  axios.get(`${baseUrl}/api/bidcreation/creation/fresh_tenders`).then((resp) => {
    if(resp.data.fresh_tender_count){
      setfresh_tenders_count(resp.data.fresh_tender_count)
    }
  })
  axios.get(`${baseUrl}/api/bidcreation/creation/awarded_tenders`).then((resp) => {
    if(resp.data.awarded_tender_count){
      setawarded_tenders_count(resp.data.awarded_tender_count)
    }
  })
  return (
          
<>
            {/* Page Heading */}
            
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              
            </div>
            
            <div className="row">
              {/* Content Row */}  
              <div className="col-xl-4 col-md-6 mb-4">
                <div className="card  shadow h-100 py-2 border-left-primary border-3">
                  <div className="card-body ">
                    <div className="row no-gutters align-items-center " >
                      <div className="col mr-2">
                        <div className="h4 text-xl font-weight-bold text-primary text-uppercase mb-2 text-center">
                          Live Tenders
                        </div>
                        
                        <div className="h2 mb-0 font-weight-bold text-gray-800 text-center">
                         {Live_tenders_count}
                        </div>
                      </div>
                      <div className="col-auto">
                      <div className="triangle-live"></div>
                        {/* <i className="fas fa-calendar fa-2x text-gray-300" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2  border-3">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h4 text-xl font-weight-bold text-success text-uppercase mb-2 text-center">
                          Fresh Tenders
                        </div>
                        <div className="h2 mb-0 font-weight-bold text-gray-800 text-center">
                           {fresh_tenders_count}
                        </div>
                      </div>
                      <div className="col-auto">
                      <div className="triangle-fresh"></div>
                        {/* <i className="fas fa-clipboard-list fa-2x text-gray-300" /> */}
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
              


              <div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2  border-3">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h4 text-xl font-weight-bold text-info text-uppercase mb-2 text-center">
                          Awarded Tenders
                        </div>
                        <div className="h2 mb-0 font-weight-bold text-gray-800 text-center">
                           {awarded_tenders_count}
                        </div>
                      </div>
                      <div className="col-auto">
                      <div className="triangle-info"></div>
                        {/* <i className="fas fa-clipboard-list fa-2x text-gray-300" /> */}
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-xl-4 col-md-6 mb-4 ">
                <div className="card border-left-info shadow h-100 py-2  border-3">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col pl-3 ">
                        <div className="text-xl font-weight-bold text-info text-uppercase mb-2">
                          Awarded Tenders
                        </div>
                          <div className="h2 mb-0 font-weight-bold text-gray-800 ">
                          5
                        </div>
                      </div>
                      <div className="col-auto">
                      <div className="triangle-awarded"></div>
                        //  <i className="fas fa-dollar-sign fa-2x text-gray-300" /> 
                        {/* <img src="assets/icons/tender_awarded1.png" alt="" width="50" height="50" className="mb-1 text-gray-300"/>}
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>  
            
            </>
  );
}

export default Dashboard;