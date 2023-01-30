import { Fragment } from "react";
import {useOutletContext, useParams } from "react-router-dom";
import CommunicationFiles from './CommunicationFiles/CommunicationFilesForm';
import Mobilization from './MobilizationAdvance/Mobilization';
import ProjetDetails from './ProjectDetails/ProjectDetails';
import LetterOfAcceptance from './LetterOfAcceptance/LetterOfAcceptance';
import WorkOrder from './WorkOrder/WorkOrder';
import LockCard from "../../../UI/LockCard";
import { useEffect } from "react";
// import PreLoader from "../../../../UI/PreLoader";

const Workorder = () => {
    const [toastSuccess, toastError, setBidManagementMainId, bidManageMainId ] = useOutletContext();
    const { id } = useParams();
 
    useEffect(() => {
        if(id) {
            setBidManagementMainId(id)
        }
      } , [])
    return(
        <Fragment>
            <LockCard locked={!id}>
            <CommunicationFiles />
            <LetterOfAcceptance />
            <WorkOrder />
            <Mobilization />
            <ProjetDetails />
           </LockCard>
        </Fragment>
    )
}

export default Workorder;