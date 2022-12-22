import { usePageTitle } from "../../hooks/usePageTitle";
import "./CompetitorMaster.css";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {  Outlet } from "react-router-dom";
import {useParams } from "react-router-dom";
import "./CompetitorMaster.css";

const Competitor = () => {
  usePageTitle("Competitor Creation");
  const { id } = useParams();
  const [activeTab,setActiveTab]=useState("profile-tab");
  const tabToggle=(event)=>{
    setActiveTab(event.target.name)
  }

  return (
      
    <Fragment>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-body">
                <div>
                  <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                    <li className="nav-item">
                      <Link
                        className={activeTab==="profile-tab" ? "nav-link active" :"nav-link"}
                        id="profile-tab"
                        name="profile-tab"
                        data-toggle="tab"
                        to={!id ? "profile" : `profile/${id}`}
                        role="tab"
                        aria-controls="profile"
                        aria-selected="true"
                        onClick={tabToggle}
                      >
                        <i className='far fa-user mr-3'></i>
                        Competitor Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={activeTab==="contactPerson-tab" ? "nav-link active" :"nav-link"}
                        id="contactPerson-tab"
                        name="contactPerson-tab"
                        data-toggle="tab"
                        to={id ? "details/"+id : "details"}
                        role="tab"
                        aria-controls="contactPerson"
                        aria-selected="false"
                        onClick={tabToggle}
                      >
                        
                        <i className='far fa-id-card mr-3'></i>
                        Competitor Details
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                    
                      className={activeTab==="contactPerson-tab" ? "tab-pane fade show active card-body bg-white" :"tab-pane fade show active card-body bg-light"} 
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <Outlet/>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>


  );
};

export default Competitor;
