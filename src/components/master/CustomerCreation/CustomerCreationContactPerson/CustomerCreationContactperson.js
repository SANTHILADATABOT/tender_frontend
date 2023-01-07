import axios from "axios";
import { get } from "jquery";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useBaseUrl } from "../../../hooks/useBaseUrl";
import useInputValidation from "../../../hooks/useInputValidation";
import { isEmailValid, isMobileValidation } from "../CommonValidation";
import CustomerCreationContactSubtable from "./CustomerCreationContactSubtable";
import Swal from "sweetalert2";



//validation custom functions
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");


const CustomerCreationContactPerson = () => {

   const [ ContactData, setContactData ] = useState([]);
   const [toastSuccess, toastError, setCustomerCreationMainID] = useOutletContext();
   const { server1: baseUrl } = useBaseUrl();
   const [mainid, setMainId] = useState();
   const [contactlist, setcontactlist] = useState(null)
   const [isEditbtn, setisEditbtn]= useState(false)
   const [contactid, setcontactid]= useState(null);
   const [isDatasending, setdatasending] = useState(false)
   const {id} = useParams()
   const navigate = useNavigate()
  //  const [formNo, setFormNo]= useState(1);

  const {
    value: contactpersonValue,
    isValid: contactpersonIsValid,
    hasError: contactpersonHasError,
    valueChangeHandler: contactpersonChangeHandler,
    inputBlurHandler: contactpersonBlurHandler,
    setInputValue: setcontactpersonValue,
    reset: resetcontactperson,
  } = useInputValidation(isNotEmpty);

  const {
    value: designationValue,
    isValid: designationIsValid,
    hasError: designationHasError,
    valueChangeHandler: designationChangeHandler,
    inputBlurHandler: designationBlurHandler,
    setInputValue: setdesignationValue,
    reset: resetdesignation,
  } = useInputValidation(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setInputValue: setemailValue,
    reset: resetemail,
  } = useInputValidation(isEmailValid);

  const {
    value: mobileValue,
    isValid: mobileIsValid,
    hasError: mobileHasError,
    valueChangeHandler: mobileChangeHandler,
    inputBlurHandler: mobileBlurHandler,
    setInputValue: setmobileValue,
    reset: resetmobile,
  } = useInputValidation(isMobileValidation);


  // const isNumber = (evt) => {
  //   evt = (evt) ? evt : window.event;
  //   var charCode = (evt.which) ? evt.which : evt.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //       return false;
  //   }
  //   return true;
  // }

  useEffect(() => {
   if(id){
    setCustomerCreationMainID(id)
    getsublist()
   }
  }, [])

   const getsublist =() =>{
    let data ={
      mainid : id,
    }

    axios.post(`${baseUrl}/api/customercreationcontact/getlist`, data).then((resp) => {
      // console.log(resp)
      let list = [...resp.data.contact];
      let listarr = list.map((item, index, arr)=> ({
        ...item,
        buttons:`<i class="fa fa-edit text-primary mx-2 h6" style="cursor:pointer" title="Edit"></i> <i class="fa fa-trash text-danger h6  mx-2" style="cursor:pointer"  title="Delete"></i>`,
        sl_no : index+1
      }))
      console.log(listarr)
      setcontactlist(listarr)
    });
  }

  const onEdit =(data) => {
    setisEditbtn(true)
    setcontactid(data.id)
    setcontactpersonValue(data.contact_person)
    setdesignationValue(data.designation)
    setemailValue(data.email)
    setmobileValue(data.mobile_no)
  }

  const onDelete = (data) => {
    Swal.fire({
      text: `Are You sure, to delete ${data.contact_person}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#2fba5f',
      cancelButtonColor: '#fc5157'
  }).then((willDelete) => {
    if(willDelete.isConfirmed){
      
      axios.delete(`${baseUrl}/api/customercreationcontact/${data.id}`).then((resp) =>{
        if (resp.data.status === 200) {
          getsublist()
          toastSuccess(resp.data.message)
        }else if(resp.data.status === 404) {
          toastError(resp.data.message)
        }else{
          toastError("Something went wrong!")
        }
      })
    } else{
      Swal.fire({
          title: 'Cancelled',
          icon:'error',
          timer: 1500
        });
  }
  })

  }

  const resetform = () => {
    resetcontactperson()
    resetdesignation()
    resetemail()
    resetmobile()
    setcontactid(null)
    setisEditbtn(false)
  }

  const postData = (data) => {
    axios.post(`${baseUrl}/api/customercreationcontact`, data).then((resp) => {
      console.log(resp);
      if (resp.data.status === 200) {
        getsublist()
        toastSuccess(resp.data.message)
        resetform()
        // navigate("/tender/master/customercreation/list/main/contactPerson");
      } else if (resp.data.status === 400) {
        toastError(resp.data.message)
      }
      setdatasending(false)
    });
  };

  const putData =(data) => {
    axios.put(`${baseUrl}/api/customercreationcontact/${contactid}`, data).then((resp) =>{
      console.log(resp);
      if (resp.data.status === 200) {
        getsublist()
        resetform()
        toastSuccess(resp.data.message)
      }else {
        toastError("Something went wrong!")
      }
      setdatasending(false)
    })
  }

  let formIsValid = false;

  if (
    contactpersonIsValid &&
    designationIsValid &&
    emailIsValid &&
    mobileIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault()
    setdatasending(true)

    if (!formIsValid) {
      console.log("Inavlid Form!");
      setdatasending(false)
      return;
    }

    let contactPersonData = {
       person_name : contactpersonValue,
       designation : designationValue,
       email : emailValue,
       mobile : mobileValue,
    }

    let datatosend ={
      contactPersonData,
      tokenid : localStorage.getItem("token"),
      cust_creation_mainid : id
    }

    if(contactid === null){
      postData(datatosend)
    }else{
      putData(datatosend)
    }

    // let editbtn = '<button>Edit</button>'
    // let deletebtn = '<button>Delete</button>'

    // let button = editbtn + deletebtn;

    // let datafortable = {
    //     ...contactPersonData,
    //     buttons :  button,
    //     sl_no : "" 
    // }

    // setContactData(ContactData.concat(datafortable))

    // resetcontactperson()
    // resetdesignation()
    // resetemail()
    // resetmobile()
  };

  

  return (
    <Fragment>
      <div className="formContent">
        {!id && <div className="loading">
          <img id="loading-image" src="/assets/img/lock.png" alt="Loading..." width ="150" height="150"/>
         
        </div>}
        <form onSubmit={submitHandler}>
          <div className="row align-items-center">
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="contactpersonname">
                    Contact Person Name:
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="contactpersonname"
                    placeholder="Enter Contact Person"
                    name="contactpersonname"
                    value={contactpersonValue}
                    onChange={contactpersonChangeHandler}
                    onBlur={contactpersonBlurHandler}
                  />
                  {contactpersonHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                        Contact Person is required.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="Designation">Designation :</label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="designationname"
                    placeholder="Enter Designation"
                    name="designationname"
                    value={designationValue}
                    onChange={designationChangeHandler}
                    onBlur={designationBlurHandler}
                  />
                  {designationHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                        Designation is required.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="email">Email :</label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="emailname"
                    placeholder="Enter Email id"
                    name="emailname"
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                  />
                  {emailHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                        Invaild Email
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="mobile">Mobile no :</label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="number"
                    className="form-control"
                    id="mobile"
                    placeholder="Enter Mobile No"
                    name="mobile"
                    value={mobileValue}
                    onChange={mobileChangeHandler}
                    onBlur={mobileBlurHandler}
                    maxLength={10}
                    />
                  {mobileHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                        Mobile no. is invalid.
                      </span>
                    </div>
                  )}
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
                {isDatasending && 'Saving...'}
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

        {/* <div className="col-lg-12 d-flex justify-content-center mt-4"> */}
          <CustomerCreationContactSubtable contactData = {contactlist} onEdit={onEdit} onDelete={onDelete}/>
        {/* </div> */}
        <div className = "col-lg-12 mt-3 d-flex justify-content-end">
          <button
              className="btn btn-outline-primary mr-3 rounded-pill"
              onClick = {() => navigate("/tender/master/customercreation/list/main/swmprojectstatus/"+id)}
            >
            Next
          </button>
          <button className="btn  btn-outline-dark rounded-pill"
            onClick = {() => navigate("/tender/master/customercreation/list")}
            
            >
              Cancel
          </button>
        </div>       
      </div>

    </Fragment>
  );
};

export default CustomerCreationContactPerson;
