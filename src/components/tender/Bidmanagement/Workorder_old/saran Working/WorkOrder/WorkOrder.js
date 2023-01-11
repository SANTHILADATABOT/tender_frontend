import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import CollapseCard from "../../../../UI/CollapseCard";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import useInputValidation from "../../../../hooks/useInputValidation";
import useAllowedMIMEDocType from "../../../../hooks/useAllowedMIMEDocType";
import useAllowedUploadFileSize from "../../../../hooks/useAllowedUploadFileSize";
import useImageStoragePath from "../../../../hooks/useImageStoragePath";
import {
  isNotEmpty,
  isNotNull,
} from "../../../CommonFunctions/CommonFunctions";
import axios from "axios";
import Swal from "sweetalert2";
import WorkOrderUploadFile from "./WorkeOrderUploadFile";
import AgreemaneUploadFile from "./AgreementUploadFile";
import SiteHandOverUploadFile from "./SiteHandOverUploadFile";

const WorkOrder = () => {
  const { id } = useParams();
  const [dataSending, setDataSending] = useState(false);
  const wrapperRef = useRef(null);
  const [dragover, setdragover] = useState(false);
  const [dragover1, setdragover1] = useState(false);
  const [dragover2, setdragover2] = useState(false);
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [workid, setworkid] = useState(null);
  const [UploadDocId, setUploadDocId] = useState(null);
  const { server1: baseUrl } = useBaseUrl();
  const [toastSuccess, toastError] = useOutletContext();
  const [progress, setProgressCompleted] = useState(0);
  const navigate = useNavigate();
  const onDragEnter = () => {
    wrapperRef.current.classList.add("dragover");
    setdragover(true);
  };
  const [updateagfile, setagfile] = useState();

  const { img: maxImageSize } = useAllowedUploadFileSize();
  const { MIMEtype: doctype } = useAllowedMIMEDocType();
  const { wofile: wofilepath } = useImageStoragePath();
  const { agfile: agfilepath } = useImageStoragePath();
  const { shofile: shofilepath } = useImageStoragePath();

  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
    setdragover(false);
  };

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.size > maxImageSize) {
      Swal.fire({
        title: "File Size",
        text: "Maximum Allowed File size is 1MB",
        icon: "error",
        confirmButtonColor: "#2fba5f",
      }).then(() => {
        setFile(null);
      });
    } else if (newFile && !doctype.includes(newFile.type)) {
      Swal.fire({
        title: "File Type",
        text: "Allowed File Type are JPG/JPEG/PNG/PDF ",
        icon: "error",
        confirmButtonColor: "#2fba5f",
      }).then(() => {
        setFile(null);
      });
    } else {
      setFile(newFile);
    }
  };

  const onDragEnter1 = () => {
    wrapperRef.current.classList.add("dragover");
    setdragover1(true);
  };

  const onDragLeave1 = () => {
    wrapperRef.current.classList.remove("dragover");
    setdragover1(false);
  };

  const onDrop1 = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop1 = (e) => {
    const newFile1 = e.target.files[0];
    if (newFile1 && newFile1.size > maxImageSize) {
      Swal.fire({
        title: "File Size",
        text: "Maximum Allowed File size is 1MB",
        icon: "error",
        confirmButtonColor: "#2fba5f",
      }).then(() => {
        setFile1(null);
      });
    } else if (newFile1 && !doctype.includes(newFile1.type)) {
      Swal.fire({
        title: "File Type",
        text: "Allowed File Type are JPG/JPEG/PNG/PDF ",
        icon: "error",
        confirmButtonColor: "#2fba5f",
      }).then(() => {
        setFile1(null);
      });
    } else {
      setFile1(newFile1);
    }
  };

  const onDragEnter2 = () => {
    wrapperRef.current.classList.add("dragover");
    setdragover2(true);
  };

  const onDragLeave2 = () => {
    wrapperRef.current.classList.remove("dragover");
    setdragover2(false);
  };

  const onDrop2 = () => wrapperRef.current.classList.remove("dragover");
  const onFileDrop2 = (e) => {
    const newFile2 = e.target.files[0];
    if (newFile2 && newFile2.size > maxImageSize) {
      Swal.fire({
        title: "File Size",
        text: "Maximum Allowed File size is 1MB",
        icon: "error",
        confirmButtonColor: "#2fba5f",
      }).then(() => {
        setFile2(null);
      });
    } else if (newFile2 && !doctype.includes(newFile2.type)) {
      Swal.fire({
        title: "File Type",
        text: "Allowed File Type are JPG/JPEG/PNG/PDF ",
        icon: "error",
        confirmButtonColor: "#2fba5f",
      }).then(() => {
        setFile2(null);
      });
    } else {
      setFile2(newFile2);
    }
  };

  const {
    value: orderQuantityvalue,
    isValid: orderQuantityIsValid,
    hasError: orderQuantityHasError,
    valueChangeHandler: orderQuantityChangeHandler,
    inputBlurHandler: orderQuantityBlurHandler,
    setInputValue: setorderQuantityValue,
    reset: resetorderQuantity,
  } = useInputValidation(isNotEmpty);

  const {
    value: PricePerUnitvalue,
    isValid: PricePerUnitIsValid,
    hasError: PricePerUnitHasError,
    valueChangeHandler: PricePerUnitChangeHandler,
    inputBlurHandler: PricePerUnitBlurHandler,
    setInputValue: setPricePerUnitValue,
    reset: resetPricePerUnit,
  } = useInputValidation(isNotEmpty);

  const {
    value: LoaDatevalue,
    isValid: LoaDateIsValid,
    hasError: LoaDateHasError,
    valueChangeHandler: LoaDateChangeHandler,
    inputBlurHandler: LoaDateBlurHandler,
    setInputValue: setLoaDateValue,
    reset: resetLoaDate,
  } = useInputValidation(isNotEmpty);

  const {
    value: OrderDatevalue,
    isValid: OrderDateIsValid,
    hasError: OrderDateHasError,
    valueChangeHandler: OrderDateChangeHandler,
    inputBlurHandler: OrderDateBlurHandler,
    setInputValue: setOrderDateValue,
    reset: resetOrderDate,
  } = useInputValidation(isNotEmpty);

  const {
    value: AgreeDatevalue,
    isValid: AgreeDateIsValid,
    hasError: AgreeDateHasError,
    valueChangeHandler: AgreeDateChangeHandler,
    inputBlurHandler: AgreeDateBlurHandler,
    setInputValue: setAgreeDateValue,
    reset: resetAgreeDate,
  } = useInputValidation(isNotEmpty);

  const {
    value: SiteHandOverDatevalue,
    isValid: SiteHandOverDateIsValid,
    hasError: SiteHandOverDateHasError,
    valueChangeHandler: SiteHandOverDateChangeHandler,
    inputBlurHandler: SiteHandOverDateBlurHandler,
    setInputValue: SiteHandOverDateDateValue,
    reset: resetSiteHandOverDate,
  } = useInputValidation(isNotEmpty);

  const resetform = () => {
    resetorderQuantity();
    resetPricePerUnit();
    resetLoaDate();
    resetOrderDate();
    resetAgreeDate();
    resetSiteHandOverDate();
    setFile();
    setFile1();
    setFile2();
  };

  let formIsValid = false;

  if (
    orderQuantityIsValid &&
    PricePerUnitIsValid &&
    LoaDateIsValid &&
    OrderDateIsValid &&
    AgreeDateIsValid &&
    SiteHandOverDateIsValid
  ) {
    formIsValid = true;
  }
  var config = {
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgressCompleted(percentCompleted);
    },
  };

  const postData = (data) => {
    axios
      .post(`${baseUrl}/api/workorder/creation/Workorder`, data, config)
      .then((resp) => {
        if (resp.data.status === 200) {
          toastSuccess(resp.data.message);
          resetform();
          navigate("/tender/bidmanagement/list/main/workorder/" + id);
        } else if (resp.data.status === 400) {
          toastError(resp.data.message);
        }
        setDataSending(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setDataSending(false);
      });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${baseUrl}/api/workorder/creation/Workorder/${id}`)
        .then((response) => {
          setworkid(response.data.WorkOrder[0].id);
        });
    }
  }, [id, baseUrl]);

  useEffect(() => {
    if (updateagfile) {
      if (updateagfile !== null) {
        var imagename = updateagfile.split(".")[0];
        var imageextention = updateagfile.split(".")[1];
        var agfiletype = "image/" + imageextention;

        var agfilename = {
          file:agfilepath,
          name:updateagfile,
          type:agfiletype,
        }
        // var image = agfilepath;

        setFile1(agfilename);
      }
    }
  },[workid,baseUrl]);

  useEffect(() => {
    if (workid) {
      axios
        .get(`${baseUrl}/api/workorder/getWorkList/${workid}`)
        .then((res) => {
          //console.log(res.data.WorkOrder);
          setorderQuantityValue(res.data.WorkOrder[0].orderquantity);
          setPricePerUnitValue(res.data.WorkOrder[0].priceperunit);
          setLoaDateValue(res.data.WorkOrder[0].loadate);
          setOrderDateValue(res.data.WorkOrder[0].orderdate);
          setAgreeDateValue(res.data.WorkOrder[0].agreedate);
          SiteHandOverDateDateValue(res.data.WorkOrder[0].sitehandoverdate);
          setagfile(res.data.WorkOrder[0].agfile);
        });
    }
  }, [workid, baseUrl]);

  const submitHandler = (e) => {
    e.preventDefault();
    setDataSending(true);
    if (!formIsValid) {
      setDataSending(false);
      return;
    }
    const formdata = new FormData();
    let data = {
      orderQuantity: orderQuantityvalue,
      PricePerUnit: PricePerUnitvalue,
      LoaDate: LoaDatevalue,
      OrderDate: OrderDatevalue,
      AgreeDate: AgreeDatevalue,
      SiteHandOverDate: SiteHandOverDatevalue,
      tokenid: localStorage.getItem("token"),
      bidid: id,
      wofile: file,
      agfile: file1,
      shofile: file2,
    };

    for (var key in data) {
      formdata.append(key, data[key]);
    }
    if (id && UploadDocId === null) {
      postData(formdata);
    }
  };
  return (
    <CollapseCard id={"WorkOrder"} title={"Work Order"}>
      <form onSubmit={submitHandler}>
        <div className="row align-items-center ">
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="date">Work Order Quantity</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="orderQuantity"
                  id="orderQuantity"
                  className="form-control"
                  value={orderQuantityvalue}
                  onChange={orderQuantityChangeHandler}
                  onBlur={orderQuantityBlurHandler}
                />
                {orderQuantityHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Work Order Quantity is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="refrence_no">
                  Price Per Unit Rs.(After Negotitation)
                </label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="PricePerUnit"
                  id="PricePerUnit"
                  className="form-control"
                  value={PricePerUnitvalue}
                  onChange={PricePerUnitChangeHandler}
                  onBlur={PricePerUnitBlurHandler}
                />
                {PricePerUnitHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Price Per Unit Rs.After Negotitation is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="from">LOA Date</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="LoaDate"
                  id="LoaDate"
                  className="form-control"
                  value={LoaDatevalue}
                  onChange={LoaDateChangeHandler}
                  onBlur={LoaDateBlurHandler}
                />
                {LoaDateHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      LOA Date is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="to">Work Order Date</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="OrderDate"
                  id="OrderDate"
                  className="form-control"
                  value={OrderDatevalue}
                  onChange={OrderDateChangeHandler}
                  onBlur={OrderDateBlurHandler}
                />
                {OrderDateHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      OrderDate is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label>Agreement Date</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="AgreeDate"
                  id="AgreeDate"
                  className="form-control"
                  value={AgreeDatevalue}
                  onChange={AgreeDateChangeHandler}
                  onBlur={AgreeDateBlurHandler}
                />
                {AgreeDateHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      AgreeDate is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="refrence_no">Site Hand Over Date</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="SiteHandOverDate"
                  id="SiteHandOverDate"
                  className="form-control"
                  value={SiteHandOverDatevalue}
                  onChange={SiteHandOverDateChangeHandler}
                  onBlur={SiteHandOverDateBlurHandler}
                />
                {SiteHandOverDateHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      AgreeDate is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-12"></div>
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
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">Upload File</div>
              <div className="col-lg-8">
                <WorkOrderUploadFile file={file} />
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label>Agreement Document Upload</label>
              </div>
              <div className="col-lg-8">
                <div
                  className="dashed border-primary height_of_dropbox boderradius__dropbox d-flex flex-column align-items-center justify-content-center  drop-file-input bg-gray-200"
                  ref={wrapperRef}
                  onDragEnter={onDragEnter1}
                  onDragLeave={onDragLeave1}
                  onDrop={onDrop1}
                >
                  <p className="display-4 mb-0">
                    <i className="fas fa-cloud-upload-alt text-primary "></i>
                  </p>
                  {!dragover1 && (
                    <p className="mt-0">Drag & Drop an document or Click</p>
                  )}
                  {dragover1 && <p className="mt-0">Drop the document</p>}
                  <input
                    type="file"
                    value=""
                    className="h-100 w-100 position-absolute top-50 start-50 pointer "
                    onChange={onFileDrop1}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">Upload File</div>
              <div className="col-lg-8">
                <AgreemaneUploadFile file={file1} />
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label>Site Hand Over Document Upload</label>
              </div>
              <div className="col-lg-8">
                <div
                  className="dashed border-primary height_of_dropbox boderradius__dropbox d-flex flex-column align-items-center justify-content-center  drop-file-input bg-gray-200"
                  ref={wrapperRef}
                  onDragEnter={onDragEnter2}
                  onDragLeave={onDragLeave2}
                  onDrop={onDrop2}
                >
                  <p className="display-4 mb-0">
                    <i className="fas fa-cloud-upload-alt text-primary "></i>
                  </p>
                  {!dragover2 && (
                    <p className="mt-0">Drag & Drop an document or Click</p>
                  )}
                  {dragover2 && <p className="mt-0">Drop the document</p>}
                  <input
                    type="file"
                    value=""
                    className="h-100 w-100 position-absolute top-50 start-50 pointer "
                    onChange={onFileDrop2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">Upload File</div>
              <div className="col-lg-8">
                <SiteHandOverUploadFile file={file2} />
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12">
            {workid ? (
              <button
                className="btn btn-primary"
                disabled={!formIsValid || dataSending}
              >
                {dataSending && progress + "% Uploaded"}
                {!dataSending && "Edit"}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!formIsValid || dataSending}
              >
                {dataSending && progress + "% Uploaded"}
                {!dataSending && "Submit"}
              </button>
            )}
          </div>
        </div>
      </form>
    </CollapseCard>
  );
};

export default WorkOrder;
