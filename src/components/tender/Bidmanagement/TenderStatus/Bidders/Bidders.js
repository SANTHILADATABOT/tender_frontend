import { usePageTitle } from "../../../../hooks/usePageTitle";
import { useState, useEffect, Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import Swal from "sweetalert2";
import BiddersList from "./BiddersList";

const Bidders = () => {
  const [toastSuccess, toastError, setBidManagementMainId, bidManageMainId] =
    useOutletContext();

  usePageTitle("Competitor Creation");

  const [bidders, setBidders] = useState("");
  const [compList, setCompList] = useState([]);
  const [input, setInput] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [compListLoading, setCompListLoading] = useState(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  let tokenId = localStorage.getItem("token");
  const { server1: baseUrl } = useBaseUrl();
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    //get the no of bidders
    // getBidders();
    getCompetitorList();
  }, []);

  const getBidders = () => {
    axios
      .get(`${baseUrl}/api/tenderstatus/${bidManageMainId}`)
      .then((response) => {
        if (response.data.status === 200) {
          setBidders(response.data.bidders);
          setEdit(true);
        }
      });
  };

  const getCompetitorList = () => {
    setCompListLoading(true);
    axios.get(`${baseUrl}/api/tenderstatus/complist`).then((resp) => {
      if (resp.data.status === 200) {
        setCompList(resp.data.compList);
      } else {
        toastError(resp.data.message);
      }
    });
    setCompListLoading(false);
  };

  const textInputHandler = (e) => {
    setInput(""); //it will reset previously created Set
    setBidders(e.target.value);
    if (
      e.target.value !== "" &&
      e.target.value.match(/^[0-9]*$/) &&
      e.target.value <= 20 &&
      e.target.value > 0
    ) {
      //to create input state based in user input
      for (let i = 0; i < e.target.value; i++) {
        setInput((prev) => {
          return {
            ...prev,
            [i]: {
              compId: [null],
              status: "",
              reason: "",
            },
          };
        });
      }
      setFormIsValid(true);
      setHasError(false);
    } else {
      setBidders("");
      setHasError(true);
      setFormIsValid(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsBtnClicked(true);
    // let tokenId = localStorage.getItem("token");
    const datatosend = {
      bidid: bidManageMainId,
      input: input,
      tokenId: localStorage.getItem("token"),
    };

    // for (var key in input) {
    //   for (var key1 in input[key]) {
    //     if (key1.includes("status")) {
    //       datatosend.append(`input[${key1}][status]`, input[key][key1][key2]);
    //     } else if (key2.includes("reason")) {
    //       datatosend.append(`input[${key1}][reason]`, input[key][key1][key2]);
    //     }
    //   }
    // }


    if (
      datatosend.bidid !== null &&
      datatosend.bidders !== null &&
      datatosend.tokenId !== null
    ) {
      axios.post(`${baseUrl}/api/tenderstatus`, datatosend).then((resp) => {
        if (resp.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Tender Status / Bidders",
            text: resp.data.message,
            timer: 2000,
          }).then(function () {
            setLoading(false);
            setIsBtnClicked(false);
            getBidders();
          });
        } else if (resp.data.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Tender Status / Bidders",
            text: resp.data.message,
            confirmButtonColor: "#5156ed",
          }).then(function () {
            setLoading(false);
            setIsBtnClicked(false);
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Tender Status / Bidders",
        text: "You are tring to submit empty values",
        confirmButtonColor: "#5156ed",
      }).then(function () {
        setLoading(false);
        setIsBtnClicked(false);
      });
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsBtnClicked(true);
    let tokenId = localStorage.getItem("token");
    const datatosend = {
      bidid: bidManageMainId,
      bidders: bidders,
      tokenId: tokenId,
    };
    if (
      datatosend.bidid !== null &&
      datatosend.bidders !== null &&
      datatosend.tokenId !== null
    ) {
      axios
        .put(`${baseUrl}/api/tenderstatus/${bidManageMainId}`, datatosend)
        .then((resp) => {
          if (resp.data.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Tender Status / Bidders",
              text: resp.data.message,
              timer: 2000,
            }).then(function () {
              setIsBtnClicked(false);
              setLoading(false);
              getBidders();
            });
          } else if (resp.data.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Tender Status / Bidders",
              text: resp.data.errors,
              confirmButtonColor: "#5156ed",
            }).then(function () {
              setLoading(false);
              setIsBtnClicked(false);
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Tender Status / Bidders",
              text: "Something went wrong!",
              confirmButtonColor: "#5156ed",
            }).then(function () {
              setLoading(false);
              setIsBtnClicked(false);
            });
          }
        });
    }
  };

  return (
    <Fragment>
      <div className="card-body mr-n5">
        <form>
          <div className="row align-items-center col-lg-12">
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center">
                <div className="col-lg-4 text-dark font-weight-bold  ml-n4">
                  <label htmlFor="bidders">
                    No of Bidders
                    <p className="text-info">Max Value : 20</p>
                  </label>
                </div>
                <div className="col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="bidders"
                    placeholder="Enter Competitor Strength"
                    name="bidders"
                    value={bidders}
                    onChange={textInputHandler}
                  />

                  {hasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-bold">
                        Enter Valid Input..!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-12 ml-n4">
            <BiddersList
              compList={compList}
              input={input}
              setInput={setInput}
              isEdited={edit}
              setCompList={setCompList}
              compListLoading= {compListLoading}
            />
          </div>

          <div className="row align-items-center col-lg-12">
            <div className="col-lg-5"></div>
            <div className="col-lg-2">
              <button
                className="btn btn-primary"
                disabled={!formIsValid || isBtnClicked === true}
                onClick={!edit ? submitHandler : updateHandler}
              >
                {!edit
                  ? loading === true
                    ? "Saving...."
                    : "Save"
                  : loading === true
                  ? "Updating...."
                  : "Update"}
              </button>
            </div>
            <div className="col-lg-5"></div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default Bidders;
