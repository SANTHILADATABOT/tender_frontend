import { usePageTitle } from "../../hooks/usePageTitle";
//import { useGetLocation } from "../../hooks/useGetLocation";
import { Fragment,  useState } from "react";
//import Select from "react-select";
import Swal from "sweetalert2";
const CompetitorProfile = () => {
    usePageTitle("Competitor Creation");

const intialValues={
    comp_no:"",
    // comp_name:"",
    // registrationType:"",
    // registrationYear:"",
    // country:" ",
    // state:"",
    // district:"",
    // city:'',
    // address:'',
    // pincode:'',
    // mobile:'',
    // email:'',
    // gstNo:'',
    // directors:'',
    // companyType:'',
    // manpower:''
};

const [competitorFromInput,setCompetitorFromInput]=useState(intialValues);
//const [registrationType,setRegistrationType]=useState([]);
//const companyTypeList=['Private','Government','Government Undertaken', 'Unregistered', 'MSME'];
//const [countryList, setCounrtyList]=useState();
//const [stateList, setStateList]=useState();
//const [districtList, setdistrictList]=useState();
//const [cityList, setCityList]=useState();

// const [registrationType,setRegistrationType]=useState([]);
// const [registrationType,setRegistrationType]=useState([]);

// useEffect ((e)=>{
//   setCompetitorFromInput({...competitorFromInput,[e.target.name]: e.target.value});

// },[competitorFromInput.companyType]);


const textInputHandler = (e)=>{
    setCompetitorFromInput({ ...competitorFromInput,[e.target.name]: e.target.value})
}

// const selectInputHandler = (e)=>{
//   setCompetitorFromInput({ ...competitorFromInput,[e.target.name]: e.target.value})
//   //setGetLocation(e.target.value,e.target.name);
// }



const submitHandler = () =>{

Swal.fire({text : 'Submitted',
icon: "success"}
//.then(()=>{})
);
}




    return (
        <Fragment>
        <form onSubmit={submitHandler}>
          <div className="row align-items-center">
            <div className="inputgroup col-lg-5 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="no">Competitor No</label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="comp_no"
                    placeholder=""
                    name="comp_no"
                    value={competitorFromInput.comp_no}
                    onChange={textInputHandler()}
                    onBlur=""
                    disabled="true"
                  />
                  </div>
                </div>
                </div>
                <div className="inputgroup col-lg-1 mb-4"></div>
               
            <div className="inputgroup col-lg-5 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customercategory">Competitor Name</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="customercategory"
                  placeholder="Enter Customer Category"
                  name="customercategory"
                  value=""
                  onChange=""
                  onBlur=""
                />
                
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-1 mb-4"></div>
{/*           
          <div className="inputgroup col-lg-5 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="customerno">Registration Type</label>
                </div>
                <div className="col-lg-8">
                <Select
                  name="customersubcategory"
                  id="customersubcategory"
                  isSearchable="true"
                  isClearable ="true"
                  options="{ColourOption}"
                  onChange="{customersubcategoryChangeHandler}"
                  onBlur="{customersubcategoryBlurHandler}"
                  value="{customersubcategoryValue}"
                ></Select>
                  </div>
                </div>
                </div>
                <div className="inputgroup col-lg-1 mb-4"></div>
                
                  <div className="inputgroup col-lg-5 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customercategory">Registeration year</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="customercategory"
                  placeholder="Enter Customer Category"
                  name="customercategory"
                  value=""
                  onChange=""
                  onBlur=""
                />
                
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-1 mb-4"></div>

          <div className="inputgroup col-lg-5 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="customerno">Country</label>
                </div>
                <div className="col-lg-8">
                <Select
                  name="customersubcategory"
                  id="customersubcategory"
                  isSearchable="true"
                  isClearable ="true"
                  options="{ColourOption}"
                  onChange="{customersubcategoryChangeHandler}"
                  onBlur="{customersubcategoryBlurHandler}"
                  value="{customersubcategoryValue}"
                ></Select>
                  </div>
                </div>
                </div>
                <div className="inputgroup col-lg-1 mb-4"></div>
                
                  <div className="inputgroup col-lg-5 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customercategory">State</label>
              </div>
              <div className="col-lg-8">
              <Select
                  name="customersubcategory"
                  id="customersubcategory"
                  isSearchable="true"
                  isClearable ="true"
                  options="{ColourOption}"
                  onChange="{customersubcategoryChangeHandler}"
                  onBlur="{customersubcategoryBlurHandler}"
                  value="{customersubcategoryValue}"
                ></Select>
                
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-1 mb-4"></div>

          <div className="inputgroup col-lg-5 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="customerno">District</label>
                </div>
                <div className="col-lg-8">
                <Select
                  name="customersubcategory"
                  id="customersubcategory"
                  isSearchable="true"
                  isClearable ="true"
                  options="{ColourOption}"
                  onChange="{customersubcategoryChangeHandler}"
                  onBlur="{customersubcategoryBlurHandler}"
                  value="{customersubcategoryValue}"
                ></Select>
                  </div>
                </div>
                </div>
                <div className="inputgroup col-lg-1 mb-4"></div>
                
                  <div className="inputgroup col-lg-5 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customercategory">City</label>
              </div>
              <div className="col-lg-8">
              <Select
                  name="customersubcategory"
                  id="customersubcategory"
                  isSearchable="true"
                  isClearable ="true"
                  options="{ColourOption}"
                  onChange="{customersubcategoryChangeHandler}"
                  onBlur="{customersubcategoryBlurHandler}"
                  value="{customersubcategoryValue}"
                ></Select>
                
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-1 mb-4"></div>

          <div className="inputgroup col-lg-5 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="customerno">Address</label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="customerno"
                    placeholder="Enter Customer No"
                    name="customerno"
                    value=""
                    onChange=
                    ""
                    onBlur=""
                  />
                  </div>
                </div>
                </div>
                <div className="inputgroup col-lg-1 mb-4"></div>
                  <div className="inputgroup col-lg-5 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customercategory">Pincode</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="customercategory"
                  placeholder="Enter Customer Category"
                  name="customercategory"
                  value=""
                  onChange=""
                  onBlur=""
                />
                
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-1 mb-4"></div>

          <div className="inputgroup col-lg-5 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="customerno">Mobbile No</label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="customerno"
                    placeholder="Enter Customer No"
                    name="customerno"
                    value=""
                    onChange=
                    ""
                    onBlur=""
                  />
                  </div>
                </div>
                </div>
                <div className="inputgroup col-lg-1 mb-4"></div>
                  <div className="inputgroup col-lg-5 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customercategory">Email ID</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="customercategory"
                  placeholder="Enter Customer Category"
                  name="customercategory"
                  value=""
                  onChange=""
                  onBlur=""
                />
                
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-1 mb-4"></div>
          <div className="inputgroup col-lg-5 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="customerno">GST No</label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="customerno"
                    placeholder="Enter Customer No"
                    name="customerno"
                    value=""
                    onChange=
                    ""
                    onBlur=""
                  />
                  </div>
                </div>
                </div>
                <div className="inputgroup col-lg-1 mb-4"></div>
                
                  <div className="inputgroup col-lg-5 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customercategory">Directors</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="customercategory"
                  placeholder="Enter Customer Category"
                  name="customercategory"
                  value=""
                  onChange=""
                  onBlur=""
                />
                
              </div>
            </div>
          </div>

          <div className="inputgroup col-lg-1 mb-4"></div>

          <div className="inputgroup col-lg-5 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="customerno">Type of Company</label>
                </div>
                <div className="col-lg-8">
                <Select
                  name="companyType"
                  id="companyType"
                  isSearchable="true"
                  isClearable ="true"
                  options={companyTypeList}
                  onChange={selectInputHandler()}
                  //onBlur="{companyTypeBlurHandler}"
                  value="{companyType}"
                ></Select>
                  </div>
                </div>
                </div>
                <div className="inputgroup col-lg-4 mb-4"></div>

                  <div className="inputgroup col-lg-5 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customercategory">Manpower Strength</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="customercategory"
                  placeholder="Enter Customer Category"
                  name="customercategory"
                  value=""
                  onChange=""
                  onBlur=""
                />
                
              </div>
            </div>
          </div>
            <div className="inputgroup col-lg-6 mb-4"></div>
            
            <div className="inputgroup col-lg-6 mb-4"></div>
            <div className="inputgroup col-lg-5 mb-4">
            <div className="row align-items-center">
              
              <div className="col-lg-10 text-right ml-3">
                <button className="btn btn-primary" onChange=""> Save & Countinue </button>              
              </div>
              <div className="col-lg-1 text-left">
                <button className="btn btn-secondary" onChange="">Cancel </button>              
              </div>
            </div>
          </div>
            

    */}      
          </div>
                </form>
      </Fragment>
  );
};

export default CompetitorProfile;
