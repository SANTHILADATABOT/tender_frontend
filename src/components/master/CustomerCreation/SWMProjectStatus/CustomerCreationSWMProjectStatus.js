import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import Select from "react-select";
import { useBaseUrl } from "../../../hooks/useBaseUrl";
import useInputValidation from "../../../hooks/useInputValidation";
import { projectType as projectTypeOptions, statusOptions, vendorTypeOptions} from "../data";
import SWMProjectStatusSubTable from "./SWMProjectStatusSubTable";
import Swal from "sweetalert2";
// validations for input value
const isNotNull = (value) => {
    if (value === null) {
        return false;
      } else if (value === "") {
        return false;
      }
      return true;
}

const initialOptions = {
  options: [],
  isLoading: false,
};



const isNotEmpty = (value) => value.trim() !== "";

const CustomerCreationSWMProjectStatus = () => {

    const navigate = useNavigate();
    const [isDatasending, setdatasending] = useState(false);
    const [isEditbtn, setisEditbtn]= useState(false);
    const [projectList,setProjectList] = useState(null)
    const [projectid, setProjectId]=useState(null)
    const {id} = useParams();
    const [toastSuccess, toastError, setCustomerCreationMainID] = useOutletContext()
    const { server1: baseUrl } = useBaseUrl();
    const [projecttypeoptions, setprojecttypeOptions] = useState(initialOptions);

    const {
        value: vendorValue,
        isValid: vendorIsValid,
        hasError: vendorHasError,
        valueChangeHandler: vendorChangeHandler,
        inputBlurHandler: vendorBlurHandler,
        setInputValue: setvendorValue,
        reset: resetvendor,
      } = useInputValidation(isNotEmpty);

      const {
        value: projectstatusValue,
        isValid: projectstatusIsValid,
        hasError: projectstatusHasError,
        valueChangeHandler: projectstatusChangeHandler,
        inputBlurHandler: projectstatusBlurHandler,
        setInputValue: setprojectstatusValue,
        reset: resetprojectstatus,
      } = useInputValidation(isNotEmpty);

      const {
        value: projectvalueValue,
        isValid: projectvalueIsValid,
        hasError: projectvalueHasError,
        valueChangeHandler: projectvalueChangeHandler,
        inputBlurHandler: projectvalueBlurHandler,
        setInputValue: setprojectvalueValue,
        reset: resetprojectvalue,
      } = useInputValidation(isNotEmpty);

      const {
        value: durationdate1Value,
        isValid: durationdate1IsValid,
        hasError: durationdate1HasError,
        valueChangeHandler: durationdate1ChangeHandler,
        inputBlurHandler: durationdate1BlurHandler,
        setInputValue: setdurationdate1Value,
        reset: resetdurationdate1,
      } = useInputValidation(isNotEmpty);

      const {
        value: durationdate2Value,
        isValid: durationdate2IsValid,
        hasError: durationdate2HasError,
        valueChangeHandler: durationdate2ChangeHandler,
        inputBlurHandler: durationdate2BlurHandler,
        setInputValue: setdurationdate2Value,
        reset: resetdurationdate2,
      } = useInputValidation(isNotEmpty);



    const {
        value: projectTypeValue,
        isValid: projectTypeIsValid,
        hasError: projectTypeHasError,
        valueChangeHandlerForReactSelect: projectTypeChangeHandler,
        inputBlurHandler: projectTypeBlurHandler,
        setInputValue: setprojectTypeValue,
        reset: resetprojectType,
    } = useInputValidation(isNotNull);

    const {
        value: statusValue,
        isValid: statusIsValid,
        hasError: statusHasError,
        valueChangeHandlerForReactSelect: statusChangeHandler,
        inputBlurHandler: statusBlurHandler,
        setInputValue: setstatusValue,
        reset: resetstatus,
    } = useInputValidation(isNotNull);

    const {
        value: vendorTypeValue,
        isValid: vendorTypeIsValid,
        hasError: vendorTypeHasError,
        valueChangeHandlerForReactSelect: vendorTypeChangeHandler,
        inputBlurHandler: vendorTypeBlurHandler,
        setInputValue: setvendorTypeValue,
        reset: resetvendorType,
    } = useInputValidation(isNotNull);

    const monthDiff = (d1, d2) => {
      var months;
      var date1 = new Date(d1);
      var date2 = new Date(d2);
      months = (date2.getFullYear() - date1.getFullYear()) * 12;
      months -= date1.getMonth();
      months += date2.getMonth();
      return months <= 0 ? 0 : months;
    }
    
  

    const getsublist =() =>{
      let data ={
        mainid : id,
      }
  
      axios.post(`${baseUrl}/api/customercreationsmwprojectstatus/getlist`, data).then((resp) => {
        let list = [...resp.data.project];
        let listarr = list.map((item, index, arr)=> ({
            ...item,
            duration: monthDiff(item.duration1, item.duration2),
            status_label: statusOptions.find(o => o.value === item.status.toString()).label, 
            projecttype_label: projectTypeOptions.find(o => o.value === item.projecttype.toString()).label,
            vendortype_label: vendorTypeOptions.find(o => o.value === item.vendortype.toString()).label,
            buttons:`<i class="fa fa-edit text-success mx-2 h6" style="cursor:pointer" title="Edit"></i> <i class="fa fa-trash text-danger h6  mx-2" style="cursor:pointer"  title="Delete"></i>`,
            sl_no : index + 1
          }))
          setProjectList(listarr)
        });
      }

      const getProjectType = async () => {
        setprojecttypeOptions((c) => {
          return { ...c, isLoading: true };
        });
        let response = await axios.get(`${baseUrl}/api/projecttype/list/${id}`)  
        let projectTypeList = { options: response.data.projectTypeList, isLoading: false }
        setprojecttypeOptions(projectTypeList)
      }
  
      
      useEffect(() => {
          if(id){
           setCustomerCreationMainID(id)
           getsublist()
          }

          getProjectType()
      }, [])

      const postData = (data) => {
        axios.post(`${baseUrl}/api/customercreationsmwprojectstatus`, data).then((resp) => {
          if (resp.data.status === 200) {
            getsublist()
            toastSuccess(resp.data.message)
            resetform()
            // navigate("/tender/master/customercreation/list/main/contactPerson");
          } else if (resp.data.status === 400) {
            toastError(resp.data.message)
          }else{
            toastError("Something went wrong!")
          }
          setdatasending(false)
         });
      };

      const putData =(data) => {
        axios.put(`${baseUrl}/api/customercreationsmwprojectstatus/${projectid}`, data).then((resp) =>{
          console.log(resp.data);
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

      const onEdit =(data) => {
        setisEditbtn(true)
        setProjectId(data.id)
        setvendorValue(data.vendor)
        setprojectstatusValue(data.projectstatus)
        setprojectvalueValue(data.projectvalue)
        setdurationdate1Value(data.duration1)
        setdurationdate2Value(data.duration2)
        // setprojectTypeValue(projectTypeOptions.find(o => o.value === data.projecttype.toString()))
        setstatusValue(statusOptions.find(o => o.value === data.status.toString()))
        setvendorTypeValue(vendorTypeOptions.find(o => o.value === data.vendortype.toString()))
      }
    
      const onDelete = (data) => {

        Swal.fire({
          text: `Are You sure, to delete ${data.projecttype}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          confirmButtonColor: '#2fba5f',
          cancelButtonColor: '#fc5157'
      }).then((willDelete) => {
        if(willDelete.isConfirmed){
          axios.delete(`${baseUrl}/api/customercreationsmwprojectstatus/${data.id}`).then((resp) =>{
            if (resp.data.status === 200) {
              getsublist()
              toastSuccess(resp.data.message)
            }else if(resp.data.status === 404){
              toastError(resp.data.message)
            }else {
              toastError("Something went wrong!")
            }
          })
        }else{
          Swal.fire({
              title: 'Cancelled',
              icon:'error',
              timer: 1500
            });
        }
      })
      }


    let formIsValid = false;

  if (
    projectTypeIsValid && statusIsValid && vendorIsValid && vendorTypeIsValid && projectvalueIsValid && projectstatusIsValid && durationdate1IsValid && durationdate2IsValid
  ) {
    formIsValid = true;
  }

    const resetform = ()=> {
        resetprojectType()
        resetstatus()
        resetvendor()
        resetprojectstatus()
        resetprojectvalue()
        resetdurationdate1()
        resetdurationdate2()
        resetvendorType()
    }

    const submitHandler = (event) => {
        event.preventDefault()
        setdatasending(true)
    
        if (!formIsValid) {
          console.log("Inavlid Form!");
          setdatasending(true)
          return;
        }

        let swmProjectStatus = {
            vendor : vendorValue,
            projectstatus : projectstatusValue,
            projectvalue : projectvalueValue,
            duarationdate1 : durationdate1Value,
            duarationdate2 : durationdate2Value,
            projecttype : projectTypeValue,
            status : statusValue,
            vendortype: vendorTypeValue,
         }

         let datatosend ={
            swmProjectStatus,
            tokenid : localStorage.getItem("token"),
            cust_creation_mainid : id
          }
      
          if(projectid === null){
            postData(datatosend)
          }else{
            putData(datatosend)
          }
      
    }

    return(
        <Fragment>
        <div className="formContent">
        {!id && <div className="loading">
          <img id="loading-image" src="/assets/img/lock.png" alt="Loading..." width ="150" height="150"/>
        </div>}
        <form onSubmit={submitHandler}>
          <div className="row align-items-center">
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center ">
                <div className="col-lg-4 text-dark font-weight-bold">
                  <label htmlFor="projecttype">
                   Project Type :
                  </label>
                </div>
                <div className="col-lg-8">
                    <Select
                    name="projecttype"
                    id="projecttype"
                    isSearchable="true"
                    options={projecttypeoptions.options}
                    isClearable="true"
                    onChange={projectTypeChangeHandler}
                    onBlur={projectTypeBlurHandler}
                    value={projectTypeValue}
                    isLoading={projecttypeoptions.isLoading}
                    ></Select>
                  {projectTypeHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                       Project Type is required.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center ">
                <div className="col-lg-4 text-dark font-weight-bold">
                  <label htmlFor="status">
                   Status :
                  </label>
                </div>
                <div className="col-lg-8">
                    <Select
                    name="status"
                    id="status"
                    isSearchable="true"
                    options={statusOptions}
                    isClearable="true"
                    onChange={statusChangeHandler}
                    onBlur={statusBlurHandler}
                    value={statusValue}
                    ></Select>
                  {statusHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                       Status is required.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center ">
                <div className="col-lg-4 text-dark font-weight-bold">
                  <label htmlFor="vendorType">
                   Vendor Type :
                  </label>
                </div>
                <div className="col-lg-8">
                    <Select
                    name="vendorType"
                    id="vendorType"
                    isSearchable="true"
                    options={vendorTypeOptions}
                    isClearable="true"
                    onChange={vendorTypeChangeHandler}
                    onBlur={vendorTypeBlurHandler}
                    value={vendorTypeValue}
                    ></Select>
                  {vendorTypeHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                       Vendor Type is required.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="vendor">
                    Vendor :
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="vendor"
                    placeholder="Enter Vendor"
                    name="vendor"
                    value={vendorValue}
                    onChange={vendorChangeHandler}
                    onBlur={vendorBlurHandler}
                  />
                  {vendorHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                        Vendor is required.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="projectstatus">
                    Project Status :
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="projectstatus"
                    placeholder="Enter Project Status"
                    name="projectstatus"
                    value={projectstatusValue}
                    onChange={projectstatusChangeHandler}
                    onBlur={projectstatusBlurHandler}
                  />
                  {projectstatusHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                        Project Status is required.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="projectvalue">
                    Project Value :
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="number"
                    className="form-control"
                    id="projectvalue"
                    placeholder="Enter Project Value"
                    name="projectvalue"
                    value={projectvalueValue}
                    onChange={projectvalueChangeHandler}
                    onBlur={projectvalueBlurHandler}
                  />
                  {projectvalueHasError && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                        Project Value is required.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="duration">
                   Duration :
                  </label>
                </div>
                <div className="col-lg-8 ">
                  <div className="col-lg-12 d-flex justify-content-between p-0">
                  <input
                    type="date"
                    className="form-control col-md-5"
                    id="durationdate1"
                    placeholder="Enter Date"
                    name="durationdate1"
                    value={durationdate1Value}
                    onChange={durationdate1ChangeHandler}
                    onBlur={durationdate1BlurHandler}
                  />
                   <input
                    type="date"
                    className="form-control col-md-5"
                    id="durationdate2"
                    placeholder="Enter Date"
                    name="durationdate2"
                    value={durationdate2Value}
                    onChange={durationdate2ChangeHandler}
                    onBlur={durationdate2BlurHandler}
                  />
                  </div>
                 
                  {(durationdate1HasError || durationdate2HasError)  && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-normal">
                        Duration is required.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="col-lg-12 d-flex justify-content-center">
              {!isEditbtn && 
              <button
                className="btn btn-outline-primary rounded-pill px-4"
                disabled={!formIsValid || isDatasending}
              >
                {isDatasending && 'Saving...'}
                {!isDatasending && 'Add'}
              </button>}
              {isEditbtn && 
               <button
                className="btn btn-outline-primary rounded-pill px-4"
                disabled={!formIsValid || isDatasending}
              >
                {isDatasending && 'Updating...'}
                {!isDatasending && 'Update'}
              </button>  }  
            </div>
          </div>
        </form>

        {/* <div className="col-lg-12 d-flex justify-content-center mt-4"> */}
          {/* <CustomerCreationContactSubtable contactData = {contactlist} onEdit={onEdit} onDelete={onDelete}/> */}
          < SWMProjectStatusSubTable projectList = {projectList} onEdit={onEdit} onDelete={onDelete}/>
        {/* </div> */}
        <div className = "col-lg-12 mt-3 d-flex justify-content-end">
          <button
              className="btn btn-outline-primary mr-3 rounded-pill"
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
    )
}

export default CustomerCreationSWMProjectStatus

// @page
// {
//     font-family: Bookman Old Style;
//      size: legal portrait;
    
// }

{/* <img src="http://law.elawhands.com/assets/images/logoword-old4.png" width="99%" /> */}