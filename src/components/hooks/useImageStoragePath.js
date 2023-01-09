import { useBaseUrl } from "./useBaseUrl";

const useImageStoragePath = () => {
    const { server1: baseUrl } = useBaseUrl();  
    return {
        qcFile : baseUrl+'/uploads/competitor/qc/',
        woFile : baseUrl+'/uploads/competitor/woFile/',
        woCompletionFile : baseUrl+'/uploads/competitor/woCompletionFile/',
        
        // Uncomment when build App
        // qcFile : baseUrl+'/public/uploads/competitor/qc/',
        // woFile : baseUrl+'/public/uploads/competitor/woFile/',
        // woCompletionFile : baseUrl+'/public/uploads/competitor/woCompletionFile/',
    }
}

export {useImageStoragePath};