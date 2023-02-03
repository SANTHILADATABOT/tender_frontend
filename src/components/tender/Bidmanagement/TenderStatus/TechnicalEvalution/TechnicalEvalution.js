import axios from "axios";
import { Fragment, useRef, useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import useInputValidation from "../../../../hooks/useInputValidation_copy";
import { isNotEmpty } from "../../../CommonFunctions/CommonFunctions";
import ReadyToUpload from "./ReadyToupload";
import styles from "./UploadDocTechnicalEvalution.module.css";
import Swal from "sweetalert2";
import LockCard from "../../../../UI/LockCard";
import PreLoader from "../../../../UI/PreLoader";
import AcceptedBidders from "./AcceptedBidders";
import { useImageStoragePath } from "../../../../hooks/useImageStoragePath";

const TechnicalEvalution = () => {
  const [file, setFile] = useState(null);
  const [isDatasending, setdatasending] = useState(false);
  const [FetchLoading, setFetchLoading] = useState(true);
  const [isEditbtn, setisEditbtn] = useState(false);
  const [isEdited, setisEdited] = useState(false);
  const [UploadDocId, setUploadDocId] = useState(null);
  const [dragover, setdragover] = useState(false);
  const [progress, setProgressCompleted] = useState(0);
  const [toastSuccess, toastError, setBidManagementMainId, bidManageMainId] =
    useOutletContext();

  const wrapperRef = useRef(null);
  const ref = useRef();
  const { id } = useParams();
  const { server1: baseUrl } = useBaseUrl();
  const [input, setInput] = useState({});

  

  const [DateValue, setDateValue]=useState("");
  const [DateHasError, setDateHasError]=useState("");
  function DateChangeHandler(e)
  {
    setDateValue(e.target.value);
    if(!e.target.value ){
      setDateHasError(true);
    }
    else{
      setDateHasError(false);
      setisEdited(true);
    }
    
  }

  const onDragEnter = () => {
    wrapperRef.current.classList.add(styles["dragover"]);
    setdragover(true);
  };

  const onDragLeave = () => {
    wrapperRef.current.classList.remove(styles["dragover"]);
    setdragover(false);
  };

  const onDrop = () => wrapperRef.current.classList.remove(styles["dragover"]);

  const onFileDrop = (e) => {
    setisEdited(true);
    const newFile = e.target.files[0];

    let filetypes = newFile.type;

    if (
      filetypes === "application/pdf" ||
      filetypes === "application/msword" ||
      filetypes ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      filetypes.split("/")[0] === "image"
    ) {
      setFile(newFile);
    } else {
      alert("File format not suppoted. Upload pdf, doc, docx and images only");
    }
  };

  var config = {
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgressCompleted(percentCompleted);
    },
  };

  function getTechEvalutionList() {
    if (bidManageMainId) {
      try{
      axios
        .get(`${baseUrl}/api/tenderstatus/techevaluation/${bidManageMainId}`)
        .then((res) => {
          if (res.status === 200) {
            axios({url: `${baseUrl}/api/tenderstatus/techevaluation/download/${bidManageMainId}`,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response)=>{
            setisEditbtn(true);
            setFile(response.data);
          });
          setUploadDocId(res.data.mainId);
            setDateValue(res.data.date);
            res.data.result.map((bidders) => {
              setInput((prev) => {
                return {
                  ...prev,
                  [bidders.competitorId]: {
                    [bidders.competitorId + "status"]: bidders.qualifiedStatus,
                    [bidders.competitorId + "reason"]: bidders.reason
                      ? bidders.reason
                      : "",
                  },
                };
              });
            });
          }
        })
        .then(()=>{
            setFetchLoading(false);
        });
      }
      catch(exception)
      {
        setFetchLoading(false);
        console.log(exception);
      }
    }
    formIsValid=false;
  };
  

  //Get List of Competitors who are involved for Technical evaluation
  useEffect(() => {
    setFetchLoading(true);
    getTechEvalutionList();
  }, [bidManageMainId]);

  useEffect(() => {
    if(isEdited)
    setisEdited(true)  
  }, [DateValue, file]);
  

  const resetform = () => {
    setDateValue("");
    setFile(null);
    //have to reset input with loop
    Object.keys(input).forEach(key => {
      setInput((prev) => {
            return {
              ...prev, [key]: {[`${key}status`]:"", [`${key}reason`]:""}
          };
        });
      });
    
    setisEditbtn(false);
    setUploadDocId(null);
  };
  
  let formIsValid = false;

  if (DateValue && file !== null) {
    formIsValid = true;
  }

  const postData = (data) => {
    axios
      .post(`${baseUrl}/api/tenderstatus/techevaluation`, data, config)
      .then((resp) => {
        if (resp.data.status === 200) {
          // ref.current.getDocList();
          // resetform();
          toastSuccess(resp.data.message);
        } else if (resp.data.status === 400) {
          toastError(resp.data.message);
        } else {
          toastError("Unable to upload the document");
        }
        setdatasending(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setdatasending(false);
      });
  };
  const putData = (data, UploadDocId) => {
    axios
      .post(
        `${baseUrl}/api/tenderstatus/techevaluation/${UploadDocId}`,
        data,
        config
      )
      .then((resp) => {
        if (resp.data.status === 200) {
          ref.current.getDocList();
          resetform();
          toastSuccess(resp.data.message);
        } else if (resp.data.status === 400) {
          toastError(resp.data.message);
        } else {
          toastError("Unable to update");
        }
        setdatasending(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setdatasending(false);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setdatasending(true);

    if (!formIsValid) {
      setdatasending(false);
      return;
    }

    const formdata = new FormData();

    let data = {
      date: DateValue,
      file: file,
      input: input,
      tokenid: localStorage.getItem("token"),
      bid_creation_mainid: id,
    };
    if(UploadDocId)
    { data._method = "PUT";
  }

    if (file instanceof Blob) {
      data.file = new File([file], file.name);
    }

    for (var key in data) {
      if (key === "input") {
        for (var key1 in data[key]) {
          for (var key2 in data[key][key1]) {
            if (key2.includes("status")) {
              formdata.append(`input[${key1}][status]`, data[key][key1][key2]);
            } else if (key2.includes("reason")) {
              formdata.append(`input[${key1}][reason]`, data[key][key1][key2]);
            }
          }
        }
      } else {
        formdata.append(key, data[key]);
      }
    }
console.log("id", id);console.log("UploadDocId === null", UploadDocId === null);console.log("UploadDocId !== null", UploadDocId !== null);console.log("!isEditbtn",!isEditbtn);console.log("isEditbtn",isEditbtn);

    if (id && UploadDocId === null && !isEditbtn) {
      postData(formdata);
    } else if (id && UploadDocId !== null && isEditbtn) {
      putData(formdata, UploadDocId);
    }
  };

 console.log("setisEdited",isEdited);
 console.log("formIsValid",formIsValid);
 console.log("isDatasending",isDatasending);
 console.log("FetchLoading",FetchLoading);
//  {(!formIsValid || isDatasending || FetchLoading) && !isEdited}
  return (
    <LockCard locked={!id}>
      <PreLoader loading={FetchLoading}>
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="row align-items-baseline">
            <div className="inputgroup col-lg-6 mb-4 ">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="Date" className="pr-3">
                    Evaluation Date :
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="Date"
                    className="form-control"
                    id="Date"
                    placeholder="Enter Date"
                    name="Date"
                    value={DateValue}
                    onChange={DateChangeHandler}
                    // onBlur={DateBlurHandler}
                    disabled={false}
                  />
                  {DateHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                        Date is required
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {file !== null && (
              <div className="inputgroup col-lg-6 mb-4">
                <div className="row ">
                  <div className="col-lg-4 text-dark font-weight-bold">
                    <label htmlFor="customername">Document Upload :</label>
                  </div>
                  <div className="col-lg-8">
                    <ReadyToUpload
                      file={file}
                      clearFile={() => setFile(null)}
                    />
                  </div>
                </div>
              </div>
            )}
            {file === null && (
              <div className="inputgroup col-lg-6 mb-4">
                <div className="row ">
                  <div className="col-lg-4 text-dark font-weight-bold">
                    <label htmlFor="customername">Document Upload :</label>
                  </div>
                  <div className="col-lg-8">
                    <div
                      className={`border-primary d-flex flex-column align-items-center justify-content-center   bg-gray-200 ${styles.height_of_dropbox} ${styles.boderradius__dropbox} ${styles.dashed} ${styles.drop_file_input} `}
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
                        className="h-100 w-100 position-absolute top-50 start-50 pointer"
                        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/* "
                        onChange={onFileDrop}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">&nbsp;</div>
              </div>
            )}

            {/* List Competitors */}

            <div className="inputgroup col-lg-12 mb-4">
              <div className="row ">
                <div className="col-lg-12 text-dark font-weight-bold">
                  <AcceptedBidders
                    bidManageMainId={bidManageMainId}
                    input={input}
                    setInput={setInput}
                    setisEdited={setisEdited}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-12 d-flex justify-content-center">
              {!isEditbtn && (
                <button
                  className={
                    !formIsValid
                      ? "btn btn-outline-primary rounded-pill px-4"
                      : "btn btn-primary rounded-pill px-4"
                  }
                  disabled={!formIsValid || isDatasending || FetchLoading}
                >
                  {isDatasending && (
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                  )}
                  {isDatasending && progress + "% Uploaded"}
                  {!isDatasending && "Submit"}
                </button>
              )}
              {isEditbtn && (
                <button
                  className={
                    !formIsValid
                      ? "btn btn-outline-primary rounded-pill px-4"
                      : "btn btn-primary rounded-pill px-4"
                  }
                  disabled={(formIsValid || isDatasending || FetchLoading) && !isEdited}
                >
                  {isDatasending && (
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                  )}
                  {isDatasending && progress + "%  Updating..."}
                  {!isDatasending && "Update"}
                </button>
              )}

              <button
                className="btn  btn-outline-dark rounded-pill mx-3"
                onClick={resetform}
                disabled={isDatasending || FetchLoading}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </PreLoader>
    </LockCard>
  );
};
export default TechnicalEvalution;
