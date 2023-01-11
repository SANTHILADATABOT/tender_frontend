import React, { useState, useRef } from "react";
import CollapseCard from "../../../../UI/CollapseCard";
import Select from "react-select";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import Swal from "sweetalert2";
import UploadFiles from "./UploadFiles";
import useInputValidation from "../../../../hooks/useInputValidation";
import {
  isNotEmpty,
  isNotNull,
} from "../../../CommonFunctions/CommonFunctions";

const CommunicationFiles = () => {
  var extensions = [".jpg", ".jpeg", ".pdf", ".png"];

  // console.log(extensions);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const { id } = useParams();
  const [dataSending, setDataSending] = useState(false);
  const { server1: baseUrl } = useBaseUrl();
  const wrapperRef = useRef(null);
  const [dragover, setdragover] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [progress, setProgressCompleted] = useState(0)
  const [formId, setFormId] = useState(0);
  const myRef = useRef(null);
  const [UploadDocId, setUploadDocId]= useState(null);
  

  const [toastSuccess, toastError, setBidManagementMainId, bidManageMainId] =
    useOutletContext();

  const onDragEnter = () => {
    wrapperRef.current.classList.add("dragover");
    setdragover(true);
  };

  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
    setdragover(false);
  };

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
    }
  };

  // console.log(file);

  const {
    value: dateValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    setInputValue: setdateValue,
    reset: resetdate,
  } = useInputValidation(isNotEmpty);

  const {
    value: refrence_noValue,
    isValid: refrence_noIsValid,
    hasError: refrence_noHasError,
    valueChangeHandler: refrence_noChangeHandler,
    inputBlurHandler: refrence_noBlurHandler,
    setInputValue: setrefrence_noValue,
    reset: resetrefrence_no,
  } = useInputValidation(isNotEmpty);

  const {
    value: fromValue,
    isValid: fromIsValid,
    hasError: fromHasError,
    valueChangeHandler: fromChangeHandler,
    inputBlurHandler: fromBlurHandler,
    setInputValue: setfromValue,
    reset: resetfrom,
  } = useInputValidation(isNotEmpty);

  const {
    value: toValue,
    isValid: toIsValid,
    hasError: toHasError,
    valueChangeHandler: toChangeHandler,
    inputBlurHandler: toBlurHandler,
    setInputValue: settoValue,
    reset: resetto,
  } = useInputValidation(isNotEmpty);

  const {
    value: subjectValue,
    isValid: subjectIsValid,
    hasError: subjectHasError,
    valueChangeHandler: subjectChangeHandler,
    inputBlurHandler: subjectBlurHandler,
    setInputValue: setsubjectValue,
    reset: resetsubject,
  } = useInputValidation(isNotEmpty);

  const {
    value: mediumValue,
    isValid: mediumIsValid,
    hasError: mediumHasError,
    valueChangeHandlerForReactSelect: mediumChangeHandler,
    inputBlurHandler: mediumBlurHandler,
    setInputValue: setmedium,
    reset: resetmedium,
  } = useInputValidation(isNotNull);

  const {
    value: med_refrence_noValue,
    isValid: med_refrence_noIsValid,
    hasError: med_refrence_noHasError,
    valueChangeHandler: med_refrence_noChangeHandler,
    inputBlurHandler: med_refrence_noBlurHandler,
    setInputValue: setmed_refrence_noValue,
    reset: resetmed_refrence_no,
  } = useInputValidation(isNotEmpty);

  var config = {
    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      setProgressCompleted(percentCompleted)
    }
}

  const postData = (data) => {
    axios
      .post(`${baseUrl}/api/workorder/creation/communicationfiles`, data,config)
      .then((resp) => {
        if (resp.data.status === 200) {
          // setBidManagementMainId(resp.data.id);
          toastSuccess(resp.data.message);
          // resetall()
          // navigate(
          //   "/tender/bidmanagement/list/main/bidcreationmain/" + resp.data.id
          // );
          myRef.current.scrollIntoView({ behavior: "smooth" });
          // window.history.replaceState({},"Bid Creation", "/tender/bidmanagement/list/main/bidcreationmain/"+resp.data.id);
        } else if (resp.data.status === 400) {
          toastError(resp.data.message);
        }
        setDataSending(false);
      })
      .catch((err) => {
        // console.log(err.message)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setDataSending(false);
      });
  };

  let formIsValid = false;

  if (
    dateIsValid &&
    refrence_noIsValid &&
    fromIsValid &&
    toIsValid &&
    subjectIsValid &&
    med_refrence_noIsValid &&
    mediumIsValid &&
    file !== null
  ) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    setDataSending(true);

    if (!formIsValid) {
      setDataSending(false);
      return;
    }
    // console.log("Submitted!");

    const formdata = new FormData();

    let communicationfiles = {
      date: dateValue,
      refrence_no: refrence_noValue,
      from: fromValue,
      to: toValue,
      subject: subjectValue,
      medium: mediumValue,
      med_refrence_no: med_refrence_noValue,
      file: file,
    };

    

    let data = {
      communicationfiles: communicationfiles,
      tokenid: localStorage.getItem("token"),
      form_id: formId,
      id: id,
    };

    for ( var key in data ) {
      formdata.append(key, data[key]);
  }

  if(id && UploadDocId === null){
      postData(formdata)
      console.log(data)
  }
  };

  return (
    <CollapseCard id={"CommunicationFiles"} title={"Communication Files"}>
      <form onSubmit={submitHandler}>
        <div className="row align-items-center ">
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="date">Date</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                  value={dateValue}
                  onChange={dateChangeHandler}
                  onBlur={dateBlurHandler}
                />
                {dateHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      date is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="refrence_no">Refrence No</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="refrence_no"
                  id="refrence_no"
                  className="form-control"
                  value={refrence_noValue}
                  onChange={refrence_noChangeHandler}
                  onBlur={refrence_noBlurHandler}
                />
                {refrence_noHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      refrence_no is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="from">From</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="from"
                  id="from"
                  className="form-control"
                  value={fromValue}
                  onChange={fromChangeHandler}
                  onBlur={fromBlurHandler}
                />
                {fromHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      from is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="to">To</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="to"
                  id="to"
                  className="form-control"
                  value={toValue}
                  onChange={toChangeHandler}
                  onBlur={toBlurHandler}
                />
                {toHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      To Is Invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="subject">Subject</label>
              </div>
              <div className="col-lg-8">
                <textarea
                  name="subject"
                  id="subject"
                  className="form-control"
                  maxLength="255"
                  value={subjectValue}
                  onChange={subjectChangeHandler}
                  onBlur={subjectBlurHandler}
                ></textarea>
                {subjectHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Subject is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label>Medium</label>
              </div>
              <div className="col-lg-8">
                <Select
                  name="medium"
                  id="medium"
                  options={options}
                  isSearchable="true"
                  isClearable="true"
                  value={mediumValue}
                  onChange={mediumChangeHandler}
                  onBlur={mediumBlurHandler}
                ></Select>
                {mediumHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Medium is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label>Med.Refrence No</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="med_refrence_no"
                  id="med_refrence_no"
                  className="form-control"
                  value={med_refrence_noValue}
                  onChange={med_refrence_noChangeHandler}
                  onBlur={med_refrence_noBlurHandler}
                />
                {med_refrence_noHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      med_refrence_no is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label>Document Upload</label>
              </div>
              <div className="col-lg-8">
                <div
                  className="dashed border-primary height_of_dropbox boderradius__dropbox d-flex flex-column align-items-center justify-content-center  drop-file-input bg-gray-200"
                  ref={wrapperRef}
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  <p className="display-4 mb-0">
                    <i className="fas fa-cloud-upload-alt text-primary "></i>
                  </p>
                  {!dragover && (
                    <p className="mt-0">Drag & Drop an document or Click</p>
                  )}
                  {dragover && <p className="mt-0">Drop the document</p>}
                  <input
                    type="file"
                    value=""
                    className="h-100 w-100 position-absolute top-50 start-50 pointer "
                    onChange={onFileDrop}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inputgroup col-lg-6 mb-4">
          <div className="row align-items-center font-weight-bold">
            <div className="col-lg-4 text-dark">Upload File</div>
            <div className="col-lg-8">
              <UploadFiles file={file} exten={extensions} />
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12">
            {id ? (
              <button
                className="btn btn-primary"
                disabled={!formIsValid || dataSending}
              >
                {dataSending ? "Editing..." : "Edit"}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!formIsValid || dataSending}
              >
                {dataSending ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </form>
    </CollapseCard>
  );
};

export default CommunicationFiles;
