import { usePageTitle } from "../../hooks/usePageTitle";
import {  useState, useEffect } from "react";
import { useBaseUrl } from "../../hooks/useBaseUrl";
import { useNavigate, useParams, NavLink, useOutletContext } from "react-router-dom";
import CompetitorBranchForm from "./Competitor_Details/CompetitorBranch/CompetitorBranchForm";
import CompetitorDetailsTurnOverForm from "./Competitor_Details/CompetitorTurnOver/CompetitorDetailsTurnOverForm"; 
import CompetitorDetailsCompanyNetWorthForm from "./Competitor_Details/CompetitorCompanyNetWorth/CompetitorDetailsCompanyNetWorthForm";
import CompetitorDetailsLineOfBusinessForm from "./Competitor_Details/CompetitorCompanyLineOfBusiness/CompetitorDetailsLineOfBusinessForm"; 
import CompetitorCompanyStrengthWeaknessForm from "./Competitor_Details/CompetitorCompanyStrengthWeakness/CompetitorCompanyStrengthWeaknessForm";
import CompetitorCompanyQualityCertificatesForm from "./Competitor_Details/CompetitorCompanyQualityCertificates/CompetitorCompanyQualityCertificatesForm";
import CompetitorCompanyWorkOrderForm from "./Competitor_Details/CompetitorCompanyWorkOrderList/CompetitorCompanyWorkOrderForm";

const comppath="tender/master/competitorcreation/competitor/details";

const CompetitorDetails = () => {
  usePageTitle("Competitor Creation");
  const { compid } = useParams();
    const { server1: baseUrl } = useBaseUrl();
  const [ competitorId, setCompetitorId] = useOutletContext();



useEffect(() => {
  if (compid) {
    setCompetitorId(compid);
  };
}, []);


  return (

    <div className="formContent">
      {!compid && (
        <div className="loading">
          <img
            id="loading-image"
            src="/assets/img/lock.png"
            alt="Loading..."
            width="150"
            height="150"
          />
        </div>
      )}
          
      <div className="card mb-2  ">
        <a   
          href="#competitorBranch"
          className="d-block card-header py-3 bg-white "
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="competitorBranch"
        >
          <h6 className="m-0 font-weight-bold text-dark">
            BRANCHES OF THE COMPANY
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="competitorBranch">
          <div className="card-header">
            <CompetitorBranchForm />
          </div>
        </div>
    </div>

    <div className="card mb-2  ">
        <a   
          href="#competitorTurnOver"
          className="d-block card-header py-3 bg-white "
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="competitorTurnOver"
        >
          <h6 className="m-0 font-weight-bold text-dark">
            TURN OVER OF THE COMPANY
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="competitorTurnOver">
          <div className="card-header">
            <CompetitorDetailsTurnOverForm />
          </div>
        </div>
    </div>

    <div className="card mb-2  ">
        <a   
          href="#competitorNetWorth"
          className="d-block card-header py-3 bg-white "
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="competitorNetWorth"
        >
          <h6 className="m-0 font-weight-bold text-dark">
            NETWORTH OF THE COMPANY
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="competitorNetWorth">
          <div className="card-header">
            <CompetitorDetailsCompanyNetWorthForm/>
          </div>
        </div>
    </div>

    <div className="card mb-2  ">
        <a   
          href="#qualitycertificates"
          className="d-block card-header py-3 bg-white "
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="qualitycertificates"
        >
          <h6 className="m-0 font-weight-bold text-dark">
          QUALITY CERTIFICATES
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="qualitycertificates">
          <div className="card-header">
            <CompetitorCompanyQualityCertificatesForm/>
          </div>
        </div>
    </div>

    <div className="card mb-2  ">
        <a   
          href="#competitorlineofbusiness"
          className="d-block card-header py-3 bg-white "
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="competitorlineofbusiness"
        >
          <h6 className="m-0 font-weight-bold text-dark">
            LINE OF BUSINESS
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="competitorlineofbusiness">
          <div className="card-header">
            <CompetitorDetailsLineOfBusinessForm/>
          </div>
        </div>
    </div>

    <div className="card mb-2  ">
        <a   
          href="#competitorworkorder"
          className="d-block card-header py-3 bg-white "
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="competitorworkorder"
        >
          <h6 className="m-0 font-weight-bold text-dark">
            WORK ORDER LIST
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="competitorworkorder">
          <div className="card-header">
            <CompetitorCompanyWorkOrderForm/>
          </div>
        </div>
    </div>


    <div className="card mb-2  ">
        <a   
          href="#competitorplusminus"
          className="d-block card-header py-3 bg-white "
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="competitorplusminus"
        >
          <h6 className="m-0 font-weight-bold text-dark">
            STRENGTH / WEAKNESS
          </h6>
        </a>
        {/* Card Content - Collapse */}
        <div className="collapse" id="competitorplusminus">
          <div className="card-header">
            <CompetitorCompanyStrengthWeaknessForm/>
          </div>
        </div>
    </div>


</div>
  );
};

export default CompetitorDetails;
