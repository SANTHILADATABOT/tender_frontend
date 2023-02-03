import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import Swal from "sweetalert2";

const AcceptedBidders = (props) => {
  const [acceptedBidders, setAcceptedBidders] = useState([]);
  const { server1: baseUrl } = useBaseUrl();
  const [formList, setFromList] = useState([]);
  const [stateArray, setStateArray] = useState();
  const [input, setInput] = useState({});

  useEffect(() => {
    try {
      axios
        .get(
          `${baseUrl}/api/bidmanagement/tenderstatus/acceptedbidders/${props.bidManageMainId}`
        )
        .then((response) => {
          if (response.status === 200) {
            // console.log("response", response.data.bidders);
            // var inputArray =response.data.bidders.map((bidders) => [{
            //     id: bidders.id,
            //     competitorId : bidders.competitorId,
            //     "status" : "",
            //     "reason": ""
            //   }]
            // );
            response.data.bidders.map((bidders) =>{
             setInput((prev)=>{return {...prev, [bidders.competitorId]:{
              [bidders.competitorId+'status'] : "", 
              reason : ""}
              }})  
            }
          );
          //  console.log("input",input);
            // setStateArray(inputArray);
            // console.log(response.data.bidders);
            setAcceptedBidders(response.data.bidders);
          }
        });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Unable to Load Data",
        timer: 2000,
      });
    }
  }, [props.bidManageMainId]);
  // if(props.input[4].status){
  // console.log("CompId",props?.input[4].status==="qualified");}
  // var stateArray = new Array();
  // const createAndSetStates = (compId, id) => {
  //   if (compId && id) {
  //     let newField = { id: compId, status: "", reason: "" };
  //     stateArray.push(newField);
  //     // stateArray[id] = newField;
  //     // props.setInput((prev)=>{return{...prev, newField}})
  //     // console.log("stateArray13", stateArray);
  //   }
  // };
  // console.log("stateArray", stateArray);

  const textInputHandler = (id, e) => {
    e.persist();
    setInput((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          [e.target.name]: e.target.value,
        },
      };
      // return {
      //   ...prev,
      //   id: id,
      //     ...prev.value,
      //     [e.target.name]: e.target.value,
      //   },
      });
    }
    // console.log("input", input);
  
  // const createForm = () => {
  //   setFromList(resultList);
  // };
  return (
    <Fragment>
      {acceptedBidders.map((item) => {
        // createAndSetStates(item.competitorId, item.id)
        return (
          <div className="row mb-2" key={item.competitorId}>
            <div className="col-sm-1"> </div>
            <div className="col-lg-4 text-dark text-left mr-4">
              <label>{item.compName}</label>
            </div>
    
            <div className="col-lg-3 text-left">
              <label className="form-check-label" htmlFor={item.competitorId+'statusqulaified'}>
                <input
                  className="form-check-input"
                  type="radio"
                  id={item.competitorId+'statusqulaified'}
                  name={item.competitorId+"status"}
                  value="qualified"
                  checked={ input && input[item.competitorId] && (input[item.competitorId][item.competitorId+'status']) && (input[item.competitorId][item.competitorId+'status'] ? (input[item.competitorId][item.competitorId+'status'] === "qualified") : false)}
                  onChange={(event) =>
                   textInputHandler(item.competitorId, event)
                  }
                />
                Qualified
              </label>
    
              <label className="pl-5 form-check-label" htmlFor={item.competitorId+'statusnotqulaified'}>
                <input
                  className="form-check-input"
                  type="radio"
                  id={item.competitorId+'statusnotqulaified'}
                  name={item.competitorId+"status"}
                  value="not qualified"
                  checked={  input && input[item.competitorId] &&  (input[item.competitorId][item.competitorId+'status']) && (input[item.competitorId][item.competitorId+'status'] ?
                   ( input[item.competitorId][item.competitorId+'status'] === "not qualified") : false)


                  }
                  onChange={(event) =>
                    textInputHandler(item.competitorId, event)
                  }
                />
                Not Qualified 
              </label>
            </div>
            <div className="col-lg-4 text-left row">
              <div className="col-lg-3">
                <label>Reason :</label>
              </div>
              <div className="col-lg-9">
                <textarea
                  className="form-control"
                  name="reason"
                  rows="2"
                  value={input[item.competitorId]?.reason}
                  onChange={(event) =>
                    textInputHandler(item.competitorId, event)
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  )
  // console.log("formList :", formList);
  // useEffect(() => {
  //   createForm();
  // }, [acceptedBidders, input]);

  // return <Fragment>{formList}</Fragment>;
};

export default AcceptedBidders;
