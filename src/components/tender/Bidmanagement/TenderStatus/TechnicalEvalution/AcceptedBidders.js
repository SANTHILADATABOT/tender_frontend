import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import Swal from "sweetalert2";

const AcceptedBidders = (props) => {
  const [acceptedBidders, setAcceptedBidders] = useState([]);
  const { server1: baseUrl } = useBaseUrl();
  let resultList=[];
  

  
    useEffect(() => {
      try{
        axios
        .get(
          `${baseUrl}/api/bidmanagement/tenderstatus/acceptedbidders/${props.bidManageMainId}`
        )
        .then((response) => {
            if(response.status===200){
                console.log("response", response.data.bidders);
                setAcceptedBidders(response.data.bidders);
            }
         
        });
    }
    catch(e){
        Swal.fire({
            icon: "error",
            title: "Unable to Load Data",
            timer: 2000,
          });
    }
    }, [props.bidManageMainId]);

useEffect(()=>{

    resultList = acceptedBidders.map((item) => {
        return (
       <div className="row" key={item.id}>
       <div className="col-lg-5 text-dark text-left">
       <label>{item.competitorId}</label>  
       </div>
       <div className="col-lg-3 text-left">
       <label><input className="form-check-input" type="radio" name="qualified" value="qualified"/>
         Qualified</label>
         
         <label className="pl-5"><input className="form-check-input" type="radio" name="qualified" value="not qualified"/>
         Not Qualified</label>
       </div>
       <div className="col-lg-4 text-left row">
           <div className="col-lg-3"><label>Reason :</label></div>
           <div className="col-lg-9"><textarea className="form-control" name="reason" rows="2"/></div>
       </div>
     </div>
    );
    })

},[acceptedBidders])

console.log("resultList",resultList)

return(
    <Fragment>
        {resultList}
    </Fragment>
)


 
    
        
};

export default AcceptedBidders;
