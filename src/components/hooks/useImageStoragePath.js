import { useBaseUrl } from "./useBaseUrl";

const useImageStoragePath = () => {
    const { server1: baseUrl } = useBaseUrl();  
    return {
        biddocs : baseUrl+'/uploads/BidManagement/biddocs/',        
        qcFile : baseUrl+'/uploads/competitor/qc/',
        woFile : baseUrl+'/uploads/competitor/woFile/',
        woCompletionFile : baseUrl+'/uploads/competitor/woCompletionFile/',
        prebiddocs : baseUrl+'/uploads/BidManagement/prebidqueries/',   
        CorrigendumPublishdocs : baseUrl+'/uploads/BidManagement/CorrigendumPublish/',   
        agfile: baseUrl+'/uploads/BidManagement/WorkOrder/WorkOrder/agreementDocument/',//Bit Management Work Order form
        workorderfile : baseUrl+'/uploads/BidManagement/WorkOrder/WorkOrder/workorderDocument/',//Bit Management Work Order form
        shofile : baseUrl+'/uploads/BidManagement/WorkOrder/WorkOrder/siteHandOverDocumet/',//Bit Management Work Order form
        commnunicationfile : baseUrl+'/uploads/BidManagement/WorkOrder/CommunicationFiles/',//Bit Management Work Order form
        
        // Uncomment when build App
        // qcFile : baseUrl+'/public/uploads/competitor/qc/',
        // woFile : baseUrl+'/public/uploads/competitor/woFile/',
        // woCompletionFile : baseUrl+'/public/uploads/competitor/woCompletionFile/',
        // biddocs : baseUrl+'/public/uploads/BidManagement/biddocs/',
        // prebiddocs : baseUrl+'/public/uploads/BidManagement/prebidqueries/',   
        // CorrigendumPublishdocs : baseUrl+'/public/uploads/BidManagement/CorrigendumPublish/',  
    }
}

export {useImageStoragePath};