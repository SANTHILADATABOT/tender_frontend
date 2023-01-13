import { Fragment, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import LockCard from "../../../UI/LockCard";
import BidSubmittedStatus from "./BidSubmittedStatus/BidSubmittedStatus";
import TenderFee from "./TenderFee/TenderFee";

const BidSubmission = () => {
    const [toastSuccess, toastError, setBidManagementMainId, bidManageMainId ] = useOutletContext();
    const { id } = useParams();
    useEffect(() => {
        if(id) {
            setBidManagementMainId(id)
        }
    }, [])

    return(
        <Fragment>
            <TenderFee/>
            <BidSubmittedStatus/>
        </Fragment>
    )
}

export default BidSubmission;