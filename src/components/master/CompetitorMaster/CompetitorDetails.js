import { usePageTitle } from "../../hooks/usePageTitle";
import { Fragment, useState } from "react";
// import Select from "react-select";
// import { useEffect } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";
import { useBaseUrl } from "../../hooks/useBaseUrl";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import CompetitorBranch from "./Competitor_Details/CompetitorBranch";

const comppath="tender/master/competitorcreation/competitor/details";

const CompetitorDetails = () => {
  usePageTitle("Competitor Creation");
  const { id } = useParams();
  const { server1: baseUrl } = useBaseUrl();
  // const navigate = useNavigate();
  
  return (
    <Fragment>
          
      <div className="card mb-2 ml-n4  mr-n4 ">
        <a   
          href="#competitorBranch"
          className="d-block card-header py-3 bg-white"
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="competitorBranch"
        >
          <h6 className="m-0 font-weight-bold text-black">
            BRANCHES OF THE COMPANY 1
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="competitorBranch">
          <div className="card-header">
            <CompetitorBranch />
          </div>
        </div>
    </div>

    <div className="card mb-2 ml-n4 mr-n4">
        <a
          href={`/${comppath}/branches/${id}`}
          className="d-block card-header py-3 bg-white"
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="competitorTurnOver"

        >
          <h6 className="m-0 font-weight-bold text-primary">
            TURN OVER OF THE COMPANY
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="competitorTurnOver">
          <div className="card-header">
            This is a collapsable card example using Bootstrap's built in
            collapse functionality. <strong>Click on the card header</strong> to
            see the card body collapse and expand!
          </div>
        </div>
      </div>

      

    <div className="card mb-2 ml-n4 mr-n4">
        <a
          href="#competitorNetWorth"
          className="d-block card-header py-3 bg-white"
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="competitorNetWorth"

        >
          <h6 className="m-0 font-weight-bold text-primary">
            NETWORTH OF THE COMPANY
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="competitorNetWorth">
          <div className="card-header">
            This is a collapsable card example using Bootstrap's built in
            collapse functionality. <strong>Click on the card header</strong> to
            see the card body collapse and expand!
          </div>
        </div>
        </div>

        <div className="card mb-2 ml-n4 mr-n4">
    <a
      href="#qualityCertificates"
      className="d-block card-header py-3 bg-white"
      data-toggle="collapse"
      role="button"
      aria-expanded="true"
      aria-controls="qualityCertificates"

    >
      <h6 className="m-0 font-weight-bold text-primary">
        QUALITY CERTIFICATES
      </h6>
    </a>
        {/* Card Content - Collapse */}
      <div className="collapse" id="qualityCertificates">
      <div className="card-header">
        This is a collapsable card example using Bootstrap's built in
        collapse functionality. <strong>Click on the card header</strong> to
        see the card body collapse and expand!
      </div>
    </div>
</div>


    </Fragment>
  );
};

export default CompetitorDetails;
