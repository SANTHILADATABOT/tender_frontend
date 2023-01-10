import { useBaseUrl } from "./useBaseUrl";

const useImageStoragePath = () => {
    const { server1: baseUrl } = useBaseUrl();  
    return {
        qcFile : baseUrl+'/public/uploads/competitor/qc/',
        woFile : baseUrl+'/public/uploads/competitor/woFile/',
        woCompletionFile : baseUrl+'/public/uploads/competitor/woCompletionFile/',
        biddocs : baseUrl+'/uploads/BidManagement/biddocs/',        
    }
}

export {useImageStoragePath};