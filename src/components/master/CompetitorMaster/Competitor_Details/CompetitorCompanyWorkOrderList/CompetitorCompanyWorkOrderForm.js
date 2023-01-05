import { usePageTitle } from "../../../../hooks/usePageTitle";
import { useAllowedUploadFileSize } from "../../../../hooks/useAllowedUploadFileSize";
import { useAllowedMIMEDocType } from "../../../../hooks/useAllowedMIMEDocType";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import Swal from "sweetalert2";
import CompetitorCompanyWorkOrderList from "./CompetitorCompanyWorkOrderList";
import "./UploadDoc.css";

const CompetitorCompanyWorkOrderForm = () => {
  const { compid } = useParams();
  usePageTitle("Competitor Creation");
  const initialValue = {
    woId: null,
    compNo: null,
    custName: "",
    projectName: "",
    tnederId: "",
    state: "",
    woDate: "",
    quantity: "",
    unit: "",
    projectValue: "",
    perTonRate: "",
    qualityCompleted: "",
    date: "",
    woFile: "",
    completionFile: "",
  };
  const [competitorWOInput, setCompetitorWOInput] = useState(initialValue);
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wOList, setWOList] = useState([]);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [previewObjURL, setPreviewObjURL] = useState(""); //for WO upload
  const [previewObjURL1, setPreviewObjURL1] = useState(""); // for Completion Certificate Upload
  const [progress, setProgressCompleted] = useState(0);
  const [dragover, setdragover] = useState(false);
  const wrapperRef = useRef(null); //for WO upload
  const wrapperRef1 = useRef(null); // for Completion Certificate Upload
  const [file, setFile] = useState(""); //for WO upload
  const [file1, setFile1] = useState(""); // for Completion Certificate Upload
  const [previewForEdit, setPreviewForEdit] = useState(""); //for WO upload
  const [previewForEdit1, setPreviewForEdit1] = useState(""); // for Completion Certificate Upload
  let tokenId = localStorage.getItem("token");
  const { server1: baseUrl } = useBaseUrl();
  const { img: maxImageSize } = useAllowedUploadFileSize();
  const { MIMEtype: doctype } = useAllowedMIMEDocType();
  // const { pdf: maxPdfSize } = useAllowedUploadFileSize();
  // const navigate = useNavigate();
  const [hasError, setHasError] = useState({
    custName: false,
    projectName: false,
    tnederId: false,
    state: false,
    woDate: false,
    quantity: false,
    unit: false,
    projectValue: false,
    perTonRate: false,
    qualityCompleted: false,
    date: false,
    woFile: false,
    completionFile: false,
  });

  useEffect(() => {
    getCompNo();
    // getWOList();
  }, []);

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
    
    if (e.target.name === "woUpload") {
      const newFile = e.target.files[0];

      if (newFile) {
        setFile(newFile);
        setPreviewObjURL(URL.createObjectURL(e.target.files[0]));
        if (previewForEdit) {
          setPreviewForEdit("");
        }
      }
    } else {
      const newFile = e.target.files[0];

      if (newFile) {
        setFile1(newFile);
        setPreviewObjURL1(URL.createObjectURL(e.target.files[0]));
        if (previewForEdit1) {
          setPreviewForEdit1("");
        }
      }
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

  useEffect(() => {
    if (file && file.size > maxImageSize) {
      Swal.fire({
        title: "File Size",
        text: "Maximum Allowed File size is 1MB",
        icon: "error",
        confirmButtonColor: "#2fba5f",
      }).then(() => {
        setFile("");
        setPreviewObjURL("");
      });
    } else if (file && !doctype.includes(file.type)) {
      Swal.fire({
        title: "File Type",
        text: "Allowed File Type are JPG/JPEG/PNG/PDF ",
        icon: "error",
        confirmButtonColor: "#2fba5f",
      }).then(() => { 
        setFile("");
        setPreviewObjURL("");
      });
    }
  }, [file]);
  const getCompNo = async () => {
    await axios
      .get(`${baseUrl}/api/competitorprofile/getcompno/${compid}`)
      .then((resp) => {
        if (resp.data.status === 200) {
          setCompetitorWOInput({
            ...competitorWOInput,
            compNo: resp.data.compNo,
          });
        }
      });
  };

  //check Form is Valid or not
  useEffect(() => {
    if (
      competitorWOInput.custName !== "" &&
      (file !== "") | (previewForEdit !== "")
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [competitorWOInput, file, previewForEdit]);

  const getWOList = () => {
    axios
      .get(`${baseUrl}/api/competitordetails/wolist/${compid}`)
      .then((resp) => {
        let list = [...resp.data.qc];
        let listarr = list.map((item, index) => ({
          ...item,

          filepath:
            `<img src="${baseUrl}/competitorWO/` +
            item.filepath +
            `" class="rounded-circle pointer" width="75" height="75" alt="image" id="qcImg" style="cursor:pointer" title="image"></img>`,
          // filepath: `<img src="${baseUrl}/storage/app/public/uploads/image/competitor/qc/`+item.filepath+`" class="rounded-circle pointer" width="75" height="75" alt="image" id="qcImg" style="cursor:pointer" title="image" ></img>`,
          buttons: `<i class="fa fa-edit text-primary mx-2 h6" style="cursor:pointer" title="Edit"></i> <i class="fa fa-trash text-danger h6  mx-2" style="cursor:pointer"  title="Delete"></i>`,
          sl_no: index + 1,
        }));
        setWOList(listarr);
      });
  };

  const getImageUrl = (s) => {
    var pattern =
      /((?:https|http):\/\/.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}:8000\/[a-zA-z0-9\/]*.(?:png|jpeg|jpg|pdf))/;
    var img_url = s.match(pattern);
    if (!(img_url[0] === null || img_url[0] === undefined)) {
      setPreviewForEdit(img_url[0]);
    } else {
      setPreviewForEdit("");
    }
  };

  const onEdit = (data) => {
    setFile("");
    var imgUrl = getImageUrl(data.filepath);

    setFormIsValid(true);
    setCompetitorWOInput({
      woId: data.id,
      compNo: data.compNo,
      custName: data.custName,
      projectName: data.projectName,
    });
  };

  const onPreview = (data) => {
    var pattern =
      /((?:https|http):\/\/.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}:8000\/[a-zA-z0-9\/]*.(?:png|jpeg|jpg|pdf))/;

    var img_url = data.filepath.match(pattern);
    window.open(img_url[0], "_blank");
  };

  const onDelete = (data) => {
    Swal.fire({
      text: `Are You sure, to delete ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#2fba5f",
      cancelButtonColor: "#fc5157",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        axios
          .delete(`${baseUrl}/api/competitorworkorder/${data.id}`)
          .then((resp) => {
            if (resp.data.status === 200) {
              Swal.fire({
                //success msg
                icon: "success",
                title: "Quality Certificate",
                text: `removed!`,
                timer: 2000,
                showConfirmButton: false,
              });
              getWOList();
            } else if (resp.data.status === 404) {
              Swal.fire({
                // error msg
                icon: "error",
                text: resp.data.message,
                showConfirmButton: true,
              });
            } else {
              Swal.fire({
                icon: "error",
                text: "Something went wrong!",
                timer: 2000,
              });
            }
          });
      } else {
        Swal.fire({
          title: "Cancelled",
          icon: "error",
          timer: 1500,
        });
      }
    });
  };

  const textInputHandler = (e) => {
    setCompetitorWOInput({
      ...competitorWOInput,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsBtnClicked(true);

    let tokenId = localStorage.getItem("token");
    const datatosend = {
      compId: compid,
      compNo: competitorWOInput.compNo,
      projectName: competitorWOInput.projectName,
      custName: competitorWOInput.custName,
      file: file,
      tokenId: tokenId,
    };

    const formdata = new FormData();

    for (var key in datatosend) {
      formdata.append(key, datatosend[key]);
    }
    if (
      datatosend.compId !== null &&
      datatosend.compNo !== null &&
      (datatosend.custName !== null || datatosend.projectName !== null)
    ) {
      axios
        .post(`${baseUrl}/api/competitorworkorder`, formdata, config)
        .then((resp) => {
          if (resp.data.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Competitor Work Order",
              text: resp.data.message,
              timer: 2000,
            }).then(function () {
              setLoading(false);
              setIsBtnClicked(false);
              setCompetitorWOInput({
                ...competitorWOInput,
                projectName: "",
                custName: "",
              });
              getWOList();
              setFile("");
              setPreviewObjURL("");
            });
          } else if (resp.data.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Competitor Work Order",
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
        title: "Competitor Work Order",
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

    if (
      compid !== null &&
      competitorWOInput.compNo !== null &&
      competitorWOInput.custName !== null &&
      competitorWOInput.woId
    ) {
      //When Image is not changed on update
      if (previewForEdit !== "" && file === "") {
        const datatosend = {
          compId: compid,
          compNo: competitorWOInput.compNo,
          projectName: competitorWOInput.projectName,
          custName: competitorWOInput.custName,
          tokenId: tokenId,
        };

        axios
          .patch(
            `${baseUrl}/api/competitorworkorder/${competitorWOInput.woId}`,
            datatosend
          )
          .then((resp) => {
            if (resp.data.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Competitor Work Order",
                text: resp.data.message,
                timer: 2000,
              }).then(function () {
                setCompetitorWOInput({
                  ...competitorWOInput,
                  woId: null,
                  projectName: "",
                  custName: "",
                });
                getWOList();
                setIsBtnClicked(false);
                setLoading(false);
                setFile("");
                setPreviewObjURL("");
              });
            } else if (resp.data.status === 404) {
              Swal.fire({
                icon: "error",
                title: "Competitor Work Order",
                text: resp.data.errors,
                confirmButtonColor: "#5156ed",
              }).then(function () {
                setLoading(false);
                setIsBtnClicked(false);
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Competitor Work Order",
                text: "Something went wrong!",
                confirmButtonColor: "#5156ed",
              }).then(function () {
                setLoading(false);
                setIsBtnClicked(false);
              });
            }
          });
      }
      //When Image is changed/reuploaded on update
      else if (previewForEdit === "" && file !== "") {
        const datatosend = {
          //woId:competitorWOInput.woId,
          compId: compid,
          compNo: competitorWOInput.compNo,
          projectName: competitorWOInput.projectName,
          custName: competitorWOInput.custName,
          file: file,
          tokenId: tokenId,
          _method: "PUT",
        };

        const formdata = new FormData();

        for (var key in datatosend) {
          formdata.append(key, datatosend[key]);
        }

        axios
          .post(
            `${baseUrl}/api/competitorworkorder/${competitorWOInput.woId}`,
            formdata,
            config
          )
          .then((resp) => {
            if (resp.data.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Competitor Work Order",
                text: resp.data.message,
                timer: 2000,
              }).then(function () {
                setCompetitorWOInput({
                  ...competitorWOInput,
                  woId: null,
                  projectName: "",
                  custName: "",
                });
                getWOList();
                setIsBtnClicked(false);
                setLoading(false);
                setFile("");
                setPreviewObjURL("");
              });
            } else if (resp.data.status === 404) {
              Swal.fire({
                icon: "error",
                title: "Competitor Work Order",
                text: resp.data.errors,
                confirmButtonColor: "#5156ed",
              }).then(function () {
                setLoading(false);
                setIsBtnClicked(false);
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Competitor Work Order",
                text: "Something went wrong!",
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
          title: "Competitor Work Order",
          text: "Upload Documnet!",
          confirmButtonColor: "#5156ed",
        }).then(function () {
          setLoading(false);
          setIsBtnClicked(false);
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Competitor Work Order",
        text: "Something went wrong!",
        confirmButtonColor: "#5156ed",
      }).then(function () {
        setLoading(false);
        setIsBtnClicked(false);
      });
    }
  };
  const removeImgHandler = (e) => {
    //e.target.name receives only undefiend so used 'e.target.id'
    if (e.target.id === "woUpload")
   { setFile("");
    setPreviewObjURL("");
    setPreviewForEdit("");
  }
  else if(e.target.id === "completionCertificate")
  { setFile1("");
   setPreviewObjURL1("");
   setPreviewForEdit1("");
 }
  };

  return (
    <div className="card-body ">
      <form>
        <div className="row align-items-center">
          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="custName"> Customer Name</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="custName"
                  placeholder="Enter Customer Name"
                  name="custName"
                  value={competitorWOInput.custName}
                  onChange={textInputHandler}
                />

                {hasError.custName && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="projectName">Project Name</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  placeholder="Enter Project Name"
                  name="projectName"
                  value={competitorWOInput.projectName}
                  onChange={textInputHandler}
                />

                {hasError.projectName && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="tnederId"> Tender Id</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="tnederId"
                  placeholder="Enter Customer Name"
                  name="tnederId"
                  value={competitorWOInput.tnederId}
                  onChange={textInputHandler}
                />

                {hasError.tnederId && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Tender ID..!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="state">State Name</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="Enter Project Name"
                  name="state"
                  value={competitorWOInput.state}
                  onChange={textInputHandler}
                />

                {/* {hasError.projectName && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="woDate"> WO Date</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="woDate"
                  placeholder="Enter Customer Name"
                  name="woDate"
                  value={competitorWOInput.woDate}
                  onChange={textInputHandler}
                />

                {hasError.woDate && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="qantity">Quantity</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="qantity"
                  placeholder="Enter Project Name"
                  name="qantity"
                  value={competitorWOInput.qantity}
                  onChange={textInputHandler}
                />

                {hasError.qantity && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="unit">Unit</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="unit"
                  placeholder="Enter Customer Name"
                  name="unit"
                  value={competitorWOInput.unit}
                  onChange={textInputHandler}
                />

                {hasError.unit && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="projectValue">Project Value</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="projectValue"
                  placeholder="Enter Project Name"
                  name="projectValue"
                  value={competitorWOInput.projectValue}
                  onChange={textInputHandler}
                />

                {hasError.projectValue && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="perTonRate">Per Ton Rate</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="perTonRate"
                  placeholder="Enter Customer Name"
                  name="perTonRate"
                  value={competitorWOInput.perTonRate}
                  onChange={textInputHandler}
                />

                {/* {hasError.perTonRate && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="qualityCompleted">Quality Completed</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="qualityCompleted"
                  placeholder="Enter Quality Completed"
                  name="qualityCompleted"
                  value={competitorWOInput.qualityCompleted}
                  onChange={textInputHandler}
                />

                {hasError.qualityCompleted && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="custName"> Date</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  placeholder="Enter Date"
                  name="date"
                  value={competitorWOInput.date}
                  onChange={textInputHandler}
                />

                {hasError.date && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              {/*<div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="projectName">WO Upload</label>
              </div>
               <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  placeholder="Enter Project Name"
                  name="projectName"
                  value={competitorWOInput.projectName}
                  onChange={textInputHandler}
                />

                {/* {hasError.projectName && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )} 
              </div> */}
            </div>
          </div>

          <div className="inputgroup col-lg-7 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold pt-1">
                <label htmlFor="woUpload"> WO Upload</label>
              </div>
              <div className="col-lg-6">
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
                    name="woUpload"
                    id="woUpload"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-5 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="woUpload">Preview</label>
              </div>
              <div className="col-lg-8">
                {file && (
                  <div className="card border-left-info shadow py-2 w-100 my-4">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col-md-9">
                          <div className="font-weight-bold text-info text-uppercase mb-1">
                            {competitorWOInput.custName}
                          </div>

                          <div className="row no-gutters align-items-center ">
                            <div className="col-auto">
                              <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 ">
                                <p className="text-truncate">{file.name}</p>
                                <p>({file.size / 1000} KB)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                          {previewObjURL && (
                            <img
                              className="rounded-circle pointer"
                              id="previewImg"
                              src={previewObjURL}
                              alt="No Image"
                              width="75px"
                              height="75px"
                              onClick={() =>
                                window.open(previewObjURL, "_blank")
                              }
                              title="Click for Preview"
                            />
                          )}
                          &nbsp;&nbsp;&nbsp;
                          {previewObjURL !== null && (
                            <span
                              className="fa fa-close text-danger h4 closebtn mr-3 pointer"
                              onClick={removeImgHandler}
                              name="woUpload"
                              id="woUpload"
                            >
                              &nbsp;
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* for edit */}

                {file === "" && previewForEdit !== "" && (
                  <div className="card border-left-info shadow py-2 w-100 my-4">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col-md-9">
                          <div className="font-weight-bold text-info text-uppercase mb-1">
                            {competitorWOInput.custName}
                          </div>

                          {/* <div className="row no-gutters align-items-center ">
                                <div className="col-auto">
                                    <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 ">
                                        <p className="text-truncate">
                                            {file.name}
                                        </p>
                                        <p>({file.size/1000} KB)</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                          {previewForEdit !== null && (
                            <img
                              className="rounded-circle pointer"
                              id="previewImg"
                              src={previewForEdit}
                              alt="No Image"
                              width="75px"
                              height="75px"
                              onClick={() =>
                                window.open(previewForEdit, "_blank")
                              }
                              title="Click for Preview"
                            />
                          )}
                          &nbsp;&nbsp;&nbsp;
                          {previewForEdit !== null && (
                            <span
                              className="fa fa-close text-danger h4 closebtn pointer"
                              onClick={removeImgHandler}
                              name="woUpload"
                              id="woUpload"
                            >
                              &nbsp;
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* {hasError.projectName && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-7 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold pt-1">
                <label htmlFor="completionCertificate">
                  {" "}
                  Completion Certificate Upload
                </label>
              </div>
              <div className="col-lg-6">
                <div
                  className="dashed border-primary height_of_dropbox boderradius__dropbox d-flex flex-column align-items-center justify-content-center  drop-file-input bg-gray-200"
                  ref={wrapperRef1}
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
                    name="completionCertificate"
                    id="completionCertificate"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-5 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-3 text-dark font-weight-bold pt-1">
                <label htmlFor="projectName">Preview</label>
              </div>
              <div className="col-lg-8">
                
                {file1 && (
                  <div className="card border-left-info shadow py-2 w-100 my-4">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col-md-9">
                          <div className="font-weight-bold text-info text-uppercase mb-1">
                            {competitorWOInput.custName}
                          </div>

                          <div className="row no-gutters align-items-center ">
                            <div className="col-auto">
                              <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 ">
                                <p className="text-truncate">{file1.name}</p>
                                <p>({file1.size / 1000} KB)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                          {previewObjURL1 && (
                            <img
                              className="rounded-circle pointer"
                              id="previewImg1"
                              src={previewObjURL1}
                              alt="No Image"
                              width="75px"
                              height="75px"
                              onClick={() =>
                                window.open(previewObjURL1, "_blank")
                              }
                              title="Click for Preview"
                            />
                          )}
                          &nbsp;&nbsp;&nbsp;
                          {previewObjURL1 !== null && (
                            <span
                              className="fa fa-close text-danger h4 closebtn"
                              onClick={removeImgHandler}
                              name="completionCertificate"
                              id="completionCertificate"
                            >
                              &nbsp;
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* for edit */}

                {file1 === "" && previewForEdit1 !== "" && (
                  <div className="card border-left-info shadow py-2 w-100 my-4">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col-md-9">
                          <div className="font-weight-bold text-info text-uppercase mb-1">
                            {competitorWOInput.custName}
                          </div>

                          {/* <div className="row no-gutters align-items-center ">
                                <div className="col-auto">
                                    <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 ">
                                        <p className="text-truncate">
                                            {file.name}
                                        </p>
                                        <p>({file.size/1000} KB)</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                          {previewForEdit1 !== null && (
                            <img
                              className="rounded-circle pointer"
                              id="previewImg"
                              src={previewForEdit1}
                              alt="No Image"
                              width="75px"
                              height="75px"
                              onClick={() =>
                                window.open(previewForEdit1, "_blank")
                              }
                              title="Click for Preview"
                            />
                          )}
                          &nbsp;&nbsp;&nbsp;
                          {previewForEdit1 !== null && (
                            <span
                              className="fa fa-close text-danger h4 closebtn pointer"
                              onClick={removeImgHandler}
                              name="completionCertificate"
                              id="completionCertificate"
                            >
                              &nbsp;
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* {hasError.projectName && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-bold">
                      Enter Valid Amount..!
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-5 mb-4"></div>
          <div className="inputgroup col-lg-2 mb-4 align-items-center">
            <div className="row">
              <button
                className="btn btn-primary"
                disabled={!formIsValid || isBtnClicked === true}
                onClick={
                  !competitorWOInput.woId ? submitHandler : updateHandler
                }
              >
                {!competitorWOInput.woId
                  ? loading === true
                    ? "Adding...."
                    : "Add"
                  : loading === true
                  ? "Updating...."
                  : "Update"}
              </button>
            </div>
          </div>
          <div className="inputgroup col-lg-5 mb-4"></div>
        </div>
      </form>
      <CompetitorCompanyWorkOrderList
        qCSubList={wOList}
        onEdit={onEdit}
        onDelete={onDelete}
        onPreview={onPreview}
      />
    </div>
  );
};
export default CompetitorCompanyWorkOrderForm;
