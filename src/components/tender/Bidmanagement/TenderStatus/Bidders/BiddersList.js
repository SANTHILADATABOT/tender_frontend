import axios from "axios";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import Swal from "sweetalert2";
import { useState, Fragment } from "react";
import Select from "react-select";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const BiddersList = (props) => {
  const [selectedOption, setSelectedOption] = useState([]);

  const textInputHandler = (e) => {
    e.persist();

    let splitstring;
    let index;
    if (
      e.target.name.includes("status") &&
      (e.target.value === "accepted" || e.target.value === "rejected")
    ) {
      splitstring = e.target.name.split("status");
      index = splitstring[1];
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
    } else if (e.target.name.includes("reason")) {
      splitstring = e.target.name.split("reason");
      index = splitstring[1];
      props.setInput((prev) => {
        return {
          ...prev,
          [index]: {
            ...prev[index],
            reason: e.target.value,
          },
        };
      });
    }

    //to reset reason

    // props.setisEdited(true);
  };

  const selectChangeHandler = (id, e) => {
    // value, action
    // console.log("Value", id);
    // console.log("Action", e);
    // console.log("compList", props.compList);
    if (id.value !== "") {
      var objIndex = e.name.split("compId");
      let inpIndex = objIndex[1];
      //  let compList = props.compList;
      console.log(objIndex);
      props.setInput((prev) => {
        return {
          ...prev,
          [inpIndex]: {
            ...prev[inpIndex],
            compId: props.compList.find((x) =>
              x.value === id.value ? { value: id.value, label: id.label } : null
            ),
          },
          //compId: id.value},
          //
        };
      });


      // props.setCompList((prev) => {return {...prev, [props.compList]: props.compList.find((x)=> ) })} 
      // props.compList.find((x)=>
      //   x.value === id.value
      //     ? props.setCompList((prev) => {
      //       console.log("True");
      //         return ({ ...prev,  [x.isdisabled] : true })}
      //       )
      //     : props.setCompList((prev) => {
      //       console.log("False");
      //         return { ...prev, [x.isdisabled] : false };
      //       }))
      // props.setCompList(

      props.setCompList((prev) => {
        return {
          ...prev,
          [inpIndex]: {
            ...prev[inpIndex],
            ["compId".isdisabled]: true,
          },
        }
      })



      // for (const i of props.compList) {
      //   console.log("i.value === id.value", i.value === id.value)
      //   if (i.value === id.value) {
      //     console.log("i", i)
      //     props.setCompList((prev)=>{ return({
      //       ...prev, [i] :{ ...prev[i], isdisabled : true}})
      //     })
      //     }
         
      //   }
       }
      //  );


      console.log("compList", props.compList);
      // props.setCompList((prev)=>{return{...prev, props.compList.find((x)=> x.value === id.value ? true: false)}});

      // setSelectedOption((prev)=>{return{
      //   ...prev, inpIndex: id.value
      // }})
      // selectedOption.push(id.value);
      // console.log("Selec ",selectedOption);
    }


  console.log("Props.input", props.input);
  const results = [];

  Object.keys(props.input).forEach((key) => {
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
            isClearable="false"
            options={props.compList}
            onChange={(event, selectedOptions) => {
              selectChangeHandler(event, selectedOptions);
            }}
            value={props.input[key]["compId"]}
            isOptionDisabled={(option) => option.isdisabled}
            //   isLoading={StateOptions.isLoading}
            // isDisabled={ id ?true:false}
          ></Select>
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
                onChange={(event) => textInputHandler(event)}
                name={"status" + key}
                id={"statusaccepted" + key}
                value="accepted"
              />
              <span className="text-dark font-weight-bold">Accepted</span>
            </label>
          </div>

          <div className="col-lg-5 mt-2">
            <label
              className="form-check-label pointer"
              htmlFor={"statusrejected" + key}
            >
              <input
                className="form-check-input"
                type="radio"
                onChange={(event) => textInputHandler(event)}
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
              name={"reason" + key}
              rows="2"
              value={props.input[key]["reason"]}
              onChange={(event) => textInputHandler(event)}
            />
          </div>
        </div>
      </div>
    );
  });

  return <Fragment>{results}</Fragment>;
};

export default BiddersList;
