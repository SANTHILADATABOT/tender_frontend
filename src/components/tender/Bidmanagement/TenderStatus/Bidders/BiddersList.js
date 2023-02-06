import axios from "axios";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import Swal from "sweetalert2";
import { Fragment, useEffect } from "react";
import { forEach } from "jszip";
import Select from "react-select";

const BiddersList = (props) => {
  const { server1: baseUrl } = useBaseUrl();

  // console.log("Props comp ", props.compList);
  // console.log("Prop Input", props.input);

  const textInputHandler = (e) => {
    e.persist();
    
    let splitstring;
    let index;
    if(e.target.name.includes("status") && (e.target.value=== "accepted" || e.target.value=== "rejected"))
    {
        splitstring= e.target.name.split("status");
        index=splitstring[1];
        props.setInput((prev) => {
            return {
              ...prev,
              [index]: {
                ...prev[index],
               status: e.target.value,
              },
            };
          });

          if (e.target.value === "accepted") {
            props.setInput((prev) => {
              return {
                ...prev,
                [index]: { ...prev[index], reason: "" },
              };
            });
          }

    }
    else if(e.target.name.includes("reason"))
    {
        console.log("includes",e.target.name.includes("reason"));
        splitstring= e.target.name.split("reason");
        index=splitstring[1];
        props.setInput((prev) => {
            console.log("prev", prev);
            return {
              ...prev,
              [index]: {
                ...prev[index],
               reason: e.target.value,
              },
            };
          });
    }
    
    console.log(e.target.value);
    
  
    //to reset reason

    
    // props.setisEdited(true);
  };
  console.log("inpuit", props.input);
  const selectChangeHandler = (id, e) => {
   
    if (id.value !== "") {
      var objIndex = e.name.split("competitor");
      let inpIndex = objIndex[1];
      let compList= props.compList;
      props.setInput((prev) => {
        return {
          ...prev,
          [inpIndex]: { ...prev[inpIndex], compId: id.value}
          // compList.find((x)=> x.value===id.value && [compId]: id.value) 
        };
      });
    }
  };

  //   console.log(props.input);

  const results = [];
  const outerLoopResult = [];
  const innerLoopResult = [];

  Object.keys(props.input).forEach((key) => {
    console.log("props.input[key]['compId']", props.input[key]["compId"]);
    results.push(
      <div className="row col-lg-12" key={key}>
        <div className="col-lg-2 text-dark font-weight-bold text-left mt-2">
          <label>Name of Bidder {parseInt(key) + 1}</label>
        </div>
        <div className="col-lg-3 text-dark text-left">
          <Select
            name={"compId" + key}
            id={"compId" + key}
            isSearchable="true"
            isClearable="true"
            options={props.compList}
            onChange={(event, selectedOptions) => {
              selectChangeHandler(event, selectedOptions);
            }}
            value={props.input[key]['compId']}
            //   isLoading={StateOptions.isLoading}
            //   isDisabled={ id ?true:false}
          />
        </div>
        <div className="col-lg-3 text-left row ml-3">
          <div className="col-lg-5 mt-2 ">
            <label
              className="form-check-label pointer"
              htmlFor={"statusaccepted" + key}
            >
              <input
                className="form-check-input"
                type="radio"
                onChange={(event) =>
                    textInputHandler(event)}
                name={"status" + key}
                id={"statusaccepted" + key}
                value="accepted"
              />
              <span className="text-dark font-weight-bold">Accepted</span>
            </label>
          </div>
          
          <div className="col-lg-5 mt-2">
            <label className="form-check-label pointer" htmlFor={"statusrejected" + key}>
              <input
                className="form-check-input"
                type="radio"
                onChange={(event) =>
                    textInputHandler(event)}
                name={"status" + key}
                id={"statusrejected" + key}
                value="rejected"
              />
              <span className="text-dark font-weight-bold">Rejected</span>
            </label>
          </div>
        </div>
        <div className="col-lg-4 text-dark text-left row mb-2  form-outline">
          <div className="col-lg-3">
            <label className="form-check-label mt-2 text-dark font-weight-bold">
              Reason :
            </label>
          </div>
          <div className="col-lg-9">
            <textarea
              className="form-control "
              name={"reason"+key}
              rows="2"
              value={props.input[key]['reason']}
              onChange={(event) => textInputHandler(event)}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      {Object.keys(props.input).map((key) => {
        return Object.keys(props.input[key]).map((key1) => {
          //   console.log("data :", key1);
          //   console.log("data :", props.input[key][key1]);
          <div className="row" key={key}>
            <div className="row mb-2 border-success">
              <div className="col-lg-2 text-dark text-left mr-4">
                <label>Name of Bidder {key}</label>
              </div>
            </div>

            {/* <div className="col-lg-6 text-dark text-left mr-4">
          <Select
                  name={"competitor"+props.input[key][key1]}
                  id={"competitor"+props.input[key][key1]}
                  isSearchable="true"
                  isClearable="true"
                  options={props.compList}
                  // onChange={(event, selectedOptions) => {
                  //   selectChangeHandler(event, selectedOptions);
                  // }}
                  // value={props.input[key.compId]}
                  // isLoading={isLoading}
                  // isDisabled={ id ?true:false}
                ></Select>
          </div> */}
          </div>;
        });
      })}
      {results}
    </Fragment>
  );
};

export default BiddersList;
