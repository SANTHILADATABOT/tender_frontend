import { Fragment } from "react";
import CommunicationFiles from './CommunicationFiles/CommunicationFiles';
import Mobilization from './MobilizationAdvance/Mobilization';
import ProjetDetails from './ProjectDetails/ProjectDetails';

const Workorder = () => {

    return(
        <Fragment>
            <CommunicationFiles />
            <Mobilization />
            <ProjetDetails />
        </Fragment>
    )
}

export default Workorder;