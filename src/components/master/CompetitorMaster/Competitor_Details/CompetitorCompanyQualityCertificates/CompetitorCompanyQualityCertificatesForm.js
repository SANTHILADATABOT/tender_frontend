import { usePageTitle } from "../../../../hooks/usePageTitle";
import { useState, useEffect, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import Swal from "sweetalert2";
import CompetitorCompanyQualityCertificatesList from "./CompetitorCompanyQualityCertificatesList";
import './UploadDoc.css'
// import UploadDoc from "./UploadDoc";




const CompetitorCompanyQualityCertificatesForm = () => {
  const { compid } = useParams();
  usePageTitle("Competitor Creation");
  const initialValue = {
    qcId: null,
    compNo: null,
    cerName: "",
    remark: "",
    file:"",
  };
  const [competitorQCInput, setCompetitorQCInput] =
    useState(initialValue);
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qCList, setQCList] = useState([]);
  const [isBtnClicked,setIsBtnClicked]=useState(false);

  const [progress, setProgressCompleted] = useState(0)
  const [dragover, setdragover] = useState(false);
  const wrapperRef = useRef(null);
  const [file, setFile] = useState(null);
  
  let tokenId = localStorage.getItem("token");
  const { server1: baseUrl } = useBaseUrl();
  // const navigate = useNavigate();

  useEffect(() => {
    getCompNo();
    getQCList();
  }, []);

  const onDragEnter = () => {
    wrapperRef.current.classList.add('dragover')
    setdragover(true)
};

const onDragLeave = () => {
    wrapperRef.current.classList.remove('dragover')
    setdragover(false)
};

const onDrop = () => wrapperRef.current.classList.remove('dragover');

const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
        setFile(newFile);
    }
}
  

  const getCompNo = async () => {
    await axios
      .get(`${baseUrl}/api/competitorprofile/getcompno/${compid}`)
      .then((resp) => {
        if (resp.data.status === 200) {
          setCompetitorQCInput({
            ...competitorQCInput,
            compNo: resp.data.compNo,
          });
        }
      });
  };
  
  //check Form is Valid or not
useEffect(() => {
  if (
      competitorQCInput.cerName !== "" || competitorQCInput.remark !== "" 
  ) {
    setFormIsValid(true);
  }
  else{
    setFormIsValid(false);
  }
}, [competitorQCInput]);

  const getQCList = () => {
    axios
      .get(`${baseUrl}/api/competitordetails/prosconslist/${compid}`)
      .then((resp) => {
        let list = [...resp.data.pros_cons];
        let listarr = list.map((item, index) => ({
          ...item,
          buttons:`<i class="fa fa-edit text-primary mx-2 h6" style="cursor:pointer" title="Edit"></i> <i class="fa fa-trash text-danger h6  mx-2" style="cursor:pointer"  title="Delete"></i>`,
          sl_no: index + 1,
        }));
        setQCList(listarr);
      });
  };




  const onEdit = (data) => {    
      setFormIsValid(true);     
        setCompetitorQCInput({
          qcId: data.id,
          compNo: data.compNo,
          cerName: data.cerName,
          remark: data.remark,
        });
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
          .delete(`${baseUrl}/api/competitorqcertificate/${data.id}`)
          .then((resp) => {
            if (resp.data.status === 200) {
              Swal.fire({
                //success msg
                icon: "success",
                title: "Quality Certificate "+resp.data.cerName,
                text: `removed!`,
                timer: 2000,
                showConfirmButton: false,
              });
              getQCList();
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
 

  const textInputHandler = (e) =>{
    setCompetitorQCInput({...competitorQCInput, [e.target.name] : e.target.value});
  }
  

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsBtnClicked(true);
    let tokenId = localStorage.getItem("token");
    const datatosend = {
      compId: compid,
      compNo: competitorQCInput.compNo,
      remark: competitorQCInput.remark,
      cerName: competitorQCInput.cerName,
      file: file,
      tokenId: tokenId,
    };
    console.log("datatosend",datatosend);
    if (
      datatosend.compId !== null &&
      datatosend.compNo !== null &&
      (datatosend.cerName !== null || datatosend.remark !== null)
    )
    {
    axios.post(`${baseUrl}/api/competitorqcertificate`, datatosend).then((resp) => {
      if (resp.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Competitor Quality Certificate",
          text: resp.data.message,
          timer: 2000,
        }).then(function () {
          setLoading(false);
          setIsBtnClicked(false);
          setCompetitorQCInput({...competitorQCInput, remark: "", cerName: ""});
          getQCList();
        });
      } else if (resp.data.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Competitor Quality Certificate",
          text: resp.data.message,
          confirmButtonColor: "#5156ed",
        }).then(function () {
          setLoading(false);
          setIsBtnClicked(false);
        });
      }
    });
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Competitor Quality Certificate",
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
      compId: compid,
      compNo: competitorQCInput.compNo,
      remark: competitorQCInput.remark,
      cerName: competitorQCInput.cerName,
      tokenId: tokenId,
    };
    if (
      datatosend.compId !== null &&
      datatosend.compNo !== null &&
      datatosend.cerName !== null &&
      competitorQCInput.qcId
    )
    {
    axios.put(`${baseUrl}/api/competitorqcertificate/${competitorQCInput.qcId}`, datatosend).then((resp) => {
      if (resp.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Competitor Quality Certificate",
          text: resp.data.message,
          timer: 2000,
        }).then(function () {
          setCompetitorQCInput({...competitorQCInput,qcId:null, remark: "", cerName: ""});
          getQCList();
          setIsBtnClicked(false);
          setLoading(false);
        });
      } else if (resp.data.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Competitor Qualiy Certificate",
          text: resp.data.errors,
          confirmButtonColor: "#5156ed",
        }).then(function () {
          setLoading(false);
          setIsBtnClicked(false);
        });
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Competitor Qualiy Certificate",
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

  console.log("File", file);

  return (
    <div className="card-body ">
      <form>
        <div className="row align-items-center">
        <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold pt-1">
                <label htmlFor="cerName"> Certificate Name

                    
                </label>
              </div>
              <div className="col-lg-6">
              <input
                  type="text"
                  className="form-control"
                  id="cerName"
                  placeholder="Enter Certificate Name"
                  name="cerName"
                  value={competitorQCInput.cerName}
                  onChange={textInputHandler}                  
                />
                
                {/* {hasError.remark && (
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
              <div className="col-lg-4 text-dark font-weight-bold pt-1">
                <label htmlFor="remark">
                  Remarks
                </label>
              </div>
              <div className="col-lg-6">
              <input
                  type="text"
                  className="form-control"
                  id="remark"
                  placeholder="Enter Remarks"
                  name="remark"
                  value={competitorQCInput.remark}
                  onChange={textInputHandler}                  
                />
                
                {/* {hasError.remark && (
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
              <div className="col-lg-4 text-dark font-weight-bold pt-1">
                <label htmlFor="cerName"> File Upload

                    
                </label>
              </div>
              <div className="col-lg-6">  
                <div className="dashed border-primary height_of_dropbox boderradius__dropbox d-flex flex-column align-items-center justify-content-center  drop-file-input bg-gray-200"
                     ref={wrapperRef}
                     onDragEnter={onDragEnter}
                     onDragLeave={onDragLeave}
                     onDrop={onDrop}
                    >
                    <p className="display-4 mb-0"><i className='fas fa-cloud-upload-alt text-primary '></i></p>
                    {!dragover && <p className="mt-0">Drag & Drop an document or Click</p>}
                    {dragover && <p className="mt-0">Drop the document</p>}
                    <input type="file" value="" className="h-100 w-100 position-absolute top-50 start-50 pointer " onChange={onFileDrop}/>
                    </div>
            
              </div>
            </div>
          </div>
          

          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold pt-1">
                <label htmlFor="remark">
                  
                </label>
              </div>
              <div className="col-lg-6">
              {/* <input
                  type="text"
                  className="form-control"
                  id="remark"
                  placeholder="Enter Remarks"
                  name="remark"
                  value={competitorQCInput.remark}
                  onChange={textInputHandler}                  
                /> */}
                
                {/* {hasError.remark && (
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
              <button className="btn btn-primary"  disabled={!formIsValid || isBtnClicked === true} onClick={!competitorQCInput.qcId ? submitHandler : updateHandler}>
                {!competitorQCInput.qcId
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
      <CompetitorCompanyQualityCertificatesList qCList={qCList} onEdit={onEdit} onDelete={onDelete}/>
    </div>
  );
};
export default CompetitorCompanyQualityCertificatesForm;
