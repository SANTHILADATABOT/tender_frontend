import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import CollapseCard from "../../../../UI/CollapseCard";
import Select from "react-select";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import useInputValidation from "../../../../hooks/useInputValidation";
import {
  isNotEmpty,
  isNotNull,
} from "../../../CommonFunctions/CommonFunctions";
import axios from "axios";
import Swal from "sweetalert2";

const LetterOfAcceptance = () => {
  const { id } = useParams();
  const [dataSending, setDataSending] = useState(false);
  const { server1: baseUrl } = useBaseUrl();
  const navigate = useNavigate();
  const myRef = useRef(null);
  const [dragover, setdragover] = useState(false);
  const wrapperRef = useRef(null);
  const [file, setFile] = useState(null);
  const [mobId, setmobId] = useState(0);
  const [toastSuccess, toastError, setBidManagementMainId, bidManageMainId] =
    useOutletContext();

    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ];

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

  const {
    value: Datevalue,
    isValid: DateIsValid,
    hasError: DateHasError,
    valueChangeHandler: DateChangeHandler,
    inputBlurHandler: DateBlurHandler,
    setInputValue: setDateValue,
    reset: resetDate,
  } = useInputValidation(isNotEmpty);

  const {
    value: refrenceNovalue,
    isValid: refrenceNoIsValid,
    hasError: refrenceNoHasError,
    valueChangeHandler: refrenceNoChangeHandler,
    inputBlurHandler: refrenceNoBlurHandler,
    setInputValue: setrefrenceNoValue,
    reset: resetrefrenceNo,
  } = useInputValidation(isNotEmpty);

  const {
    value: fromvalue,
    isValid: fromIsValid,
    hasError: fromHasError,
    valueChangeHandler: fromChangeHandler,
    inputBlurHandler: fromBlurHandler,
    setInputValue: setfromValue,
    reset: resetfrom,
  } = useInputValidation(isNotEmpty);

  const {
    value: mediumvalue,
    isValid: mediumIsValid,
    hasError: mediumHasError,
    valueChangeHandler: mediumChangeHandler,
    inputBlurHandler: mediumBlurHandler,
    setInputValue: setmediumValue,
    reset: resetmedium,
  } = useInputValidation(isNotEmpty);

  const {
    value: medRefrenceNovalue,
    isValid: medRefrenceNoIsValid,
    hasError: medRefrenceNoHasError,
    valueChangeHandler: medRefrenceNoChangeHandler,
    inputBlurHandler: medRefrenceNoBlurHandler,
    setInputValue: setmedRefrenceNoValue,
    reset: resetmedRefrenceNo,
  } = useInputValidation(isNotEmpty);

  const {
    value: mediumSelectvalue,
    isValid: mediumSelectIsValid,
    hasError: mediumSelectHasError,
    valueChangeHandler: mediumSelectChangeHandler,
    inputBlurHandler: mediumSelectBlurHandler,
    setInputValue: mediumSelectValue,
    reset: resetmediumSelect,
  } = useInputValidation(isNotEmpty);

  let formIsValid = false;

  if (DateIsValid && refrenceNoIsValid && fromIsValid && mediumIsValid && medRefrenceNoIsValid && mediumSelectIsValid) {
    formIsValid = true;
  }

  return (
    <CollapseCard id={"LetterOfAcceptance"} title={"Letter Of Acceptance"}>
      <form>
        <div className="row align-items-center ">
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="date">Date</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="Date"
                  id="Date"
                  className="form-control"
                  value={Datevalue}
                  onChange={DateChangeHandler}
                  onBlur={DateBlurHandler}
                />
                {DateHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Date is invalid
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
                  name="refrenceNo"
                  id="refrenceNo"
                  className="form-control"
                  value={refrenceNovalue}
                  onChange={refrenceNoChangeHandler}
                  onBlur={refrenceNoBlurHandler}
                />
                {refrenceNoHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    refrenceNo is invalid
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
                  value={fromvalue}
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
                <label htmlFor="to">Medium</label>
              </div>
              <div className="col-lg-8 ">
                <div className="d-flex justify-content-between">
                <input
                  type="text"
                  name="medium"
                  id="medium"
                  className="form-control"
                  value={mediumvalue}
                  onChange={mediumChangeHandler}
                  onBlur={mediumBlurHandler}
                />
                <Select
                  name="mediumSelect"
                  id="mediumSelect"
                  options={options}
                  isSearchable="true"
                  isClearable="true"
                  value={mediumSelectvalue}
                  onChange={mediumSelectChangeHandler}
                  onBlur={mediumSelectBlurHandler}
                ></Select>
                </div>
                <div className="d-flex justify-content-between">
                {mediumHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    medium is invalid
                    </span>
                  </div>
                )}
                {mediumSelectHasError && (
                    <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    mediumSelect is invalid
                    </span>
                  </div>
                )}
                </div>                
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
                  name="medRefrenceNo"
                  id="medRefrenceNo"
                  className="form-control"
                  value={medRefrenceNovalue}
                  onChange={medRefrenceNoChangeHandler}
                  onBlur={medRefrenceNoBlurHandler}
                />
                {medRefrenceNoHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    medRefrenceNo is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
          <div className="row align-items-center font-weight-bold">
            <div className="col-lg-4 text-dark">
              <label>Work Order Document Upload</label>
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

export default LetterOfAcceptance;
