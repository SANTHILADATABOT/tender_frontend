import { Fragment, useRef, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom";
import useInputValidation from "../../../../hooks/useInputValidation";
import { isNotEmpty } from "../../../CommonFunctions/CommonFunctions";
import ReadyToUpload from "./ReadyToupload";
import './UploadDoc.css'
import Swal from "sweetalert2";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import axios from "axios";
import DocList from "./DocList";

const UploadDoc = () => {

    const wrapperRef = useRef(null);
    const [isDatasending, setdatasending] = useState(false);
    const [isEditbtn, setisEditbtn]= useState(false)
    const [UploadDocId, setUploadDocId]= useState(null);
    const [file, setFile] = useState(null);
    const [dragover, setdragover] = useState(false);
    const { id } = useParams();
    const { server1: baseUrl } = useBaseUrl();
    const [toastSuccess, toastError, setBidManagementMainId, bidManageMainId ] = useOutletContext();
    const [progress, setProgressCompleted] = useState(0)

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

 
    const {
        value: docnameValue,
        isValid: docnameIsValid,
        hasError: docnameHasError,
        valueChangeHandler: docnameChangeHandler,
        inputBlurHandler: docnameBlurHandler,
        setInputValue: setdocnameValue,
        reset: resetdocname,
      } = useInputValidation(isNotEmpty);


    var config = {
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          setProgressCompleted(percentCompleted)
        }

    }

      const resetform =() => {
          resetdocname();
          setFile(null)
      }
    
      const postData = (data) => {
        axios.post(`${baseUrl}/api/bidcreation/creation/docupload`, data, config).then((resp) => {
            if (resp.data.status === 200) {
              toastSuccess(resp.data.message)
              // resetall()
            //   navigate("/tender/bidmanagement/list/main/bidcreationmain/"+resp.data.id);
            //   myRef.current.scrollIntoView({ behavior: 'smooth' })    
              // window.history.replaceState({},"Bid Creation", "/tender/bidmanagement/list/main/bidcreationmain/"+resp.data.id);
             
      
            } else if (resp.data.status === 400) {
              toastError(resp.data.message)
            }
            setdatasending(false)
          }).catch((err) => {
              // console.log(err.message)
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                })
                setdatasending(false)
          });
      }
    
    let formIsValid = false;
    
    if (
        docnameIsValid &&
        (file !== null)
      ) {
        formIsValid = true;
      }
    

    const submitHandler =(e) =>{
        e.preventDefault()

        setdatasending(true);

        if (!formIsValid) {
        setdatasending(false);
        return;
        }

        const formdata = new FormData();


        let data = {
            docname : docnameValue,
            file : file,
            tokenid: localStorage.getItem("token"),
            bid_creation_mainid : id,
        }

        for ( var key in data ) {
            formdata.append(key, data[key]);
        }
     

        if(id && UploadDocId === null){
            postData(formdata)
        }
      
    }  
 
    // console.log(file)
console.log(wrapperRef);
    return (
        <Fragment>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
           <h1 className="h4 mb-0 text-primary">Upload document</h1>
        </div>
        <form onSubmit={submitHandler}>
        <div className="row align-items-baseline">
          <div className="inputgroup col-lg-6 mb-4 ">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="docname" className="pr-3">
                 Document Name :
                </label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="docname"
                  placeholder=""
                  name="docname"
                  value={docnameValue}
                  onChange={docnameChangeHandler}
                  onBlur={docnameBlurHandler}
                  disabled={false}
                />
                {docnameHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                        Document Name. is required
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
            <div className="col-lg-4 text-dark font-weight-bold mt-4">
                <label htmlFor="docname" className="pr-3 mt-3 ">
                    (Ready to Upload) 
                </label>
              </div>
                <div  className="col-lg-8 text-dark mt-1">
                 <ReadyToUpload file = {file} docName ={docnameValue}/>
                </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row ">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customername">Document Upload :</label>
              </div>
              <div className="col-lg-8">
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
          <div className="col-lg-12 d-flex justify-content-center">
              {!isEditbtn && 
              <button
                className={(!formIsValid) ?  "btn btn-outline-primary rounded-pill px-4" :  "btn btn-primary rounded-pill px-4"} 
                disabled={!formIsValid || isDatasending}
              >
                {isDatasending && <span className="spinner-border spinner-border-sm mr-2"></span> }
                {isDatasending && progress+'% Uploaded'}
                {!isDatasending && 'Add'}
              </button>}
              {isEditbtn && 
               <button
                className={(!formIsValid) ?  "btn btn-outline-primary rounded-pill px-4" :  "btn btn-primary rounded-pill px-4"} 
                disabled={!formIsValid || isDatasending}
              >
                {isDatasending && <span className="spinner-border spinner-border-sm mr-2"></span> }
                {isDatasending && 'Updating...'}
                {!isDatasending && 'Update'}
              </button>  }  

              <button
                className="btn  btn-outline-dark rounded-pill mx-3"
                onClick={resetform}
                disabled={isDatasending}
              >
                Clear
              </button>
            </div>
        </div>
      </form>
         <DocList/>       
        </Fragment>
    )
}

export default UploadDoc