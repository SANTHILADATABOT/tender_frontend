import { Fragment, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { usePageTitle } from "../../../hooks/usePageTitle";
import BidCreation from "./Bidcreate/BidCreation";
import CorrigendumPublish from "./CorrigendumPublish/CorrigendumPublish";
import PrebidQueries from "./PrebidQueries/PrebidQueries";
import TenderParticipation from "./TenderParticipation/TenderParticipation";

const BidCreationMain = () => {

    usePageTitle("Bid Creation");

    const [toastSuccess, toastError, setBidManagementMainId, bidManageMainId ] = useOutletContext();
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            setBidManagementMainId(id)
        }
            
    }, [])

    
    return(
        <Fragment>
            <BidCreation/>
            <CorrigendumPublish/>
            <PrebidQueries/>
            <TenderParticipation/>
        </Fragment>
    )
}

export default BidCreationMain;