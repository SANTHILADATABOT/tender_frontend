import { useBaseUrl } from "./useBaseUrl";

const useImageStoragePath = () => {
    const { server1: baseUrl } = useBaseUrl();  
    return {
        biddocs : baseUrl+'/uploads/BidManagement/biddocs/',        
        qcFile : baseUrl+'/uploads/competitor/qc/',
        woFile : baseUrl+'/uploads/competitor/woFile/',
        woCompletionFile : baseUrl+'/uploads/competitor/woCompletionFile/',
        
        
        
        
        
        // Uncomment when build App
        // qcFile : baseUrl+'/public/uploads/competitor/qc/',
        // woFile : baseUrl+'/public/uploads/competitor/woFile/',
        // woCompletionFile : baseUrl+'/public/uploads/competitor/woCompletionFile/',
        // biddocs : baseUrl+'/public/uploads/BidManagement/biddocs/',
    }
}

export {useImageStoragePath};