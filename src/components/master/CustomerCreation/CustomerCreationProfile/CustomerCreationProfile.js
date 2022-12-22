import { Fragment, useEffect, useState } from "react";
import $ from 'jquery';
import Select from "react-select";
import useInputValidation from "../../../hooks/useInputValidation";
import { CustSubCatgyOpts } from "../data";
import {
  getCountryData,
  getSatateData,
  getDistrictData,
  getCityData,
  getCustSubCatList,
} from "../apiUtilites";
import { useBaseUrl } from "../../../hooks/useBaseUrl";
import axios from "axios";
import { isMobileValidation, isPincodeValid, isEmailValid, isPanValid, isgstNoValid, isUrlValid } from "../CommonValidation";


import { useNavigate, useOutletContext, useParams } from "react-router-dom";




const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isNotNull = (value) => {
  if (value === null) {
    return false;
  } else if (value === "") {
    return false;
  }
  return true;
};

const initialOptions = {
  options: [],
  isLoading: false,
};



const CustomerCreationProfile = () => {
  const { server1: baseUrl } = useBaseUrl();
  const [formNo, setFormNo]= useState(1);
  const [formId, setFormId]= useState(0);
  const [mainid, setMainId] = useState(0);
  const [isdatasending, setdatasending] = useState(false)
  const [isCustNoFetching, setCustNoFetching] = useState(false)
  const [custsubcategoryOptions, setcustomersubcategoryOptions] = useState(initialOptions);
  const [CountryOptions, setCountryOptions] = useState(initialOptions);
  const [StateOptions, setStateoptions] = useState(initialOptions);
  const [DistrictOptions, setDistrictoptions] = useState(initialOptions);
  const [CityOptions, setCityoptions] = useState(initialOptions);
  const [GstNoDisable, setGstNoDisable] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [addresslen, setaddresslength] =  useState(255);
  const [savedData, setSavedData] =useState({})
  const [isRendered, setIsrendered] = useState(false)

  const { id } = useParams();

  const navigate = useNavigate()
  const [toastSuccess, toastError, setCustomerCreationMainID] = useOutletContext();

  const {
    value: customernoValue,
    isValid: customernoIsValid,
    hasError: customernoHasError,
    valueChangeHandler: customernoChangeHandler,
    inputBlurHandler: customernoBlurHandler,
    setInputValue: setcustomernoValue,
    reset: resetcustomerno,
  } = useInputValidation(isNotEmpty);

  // const {
  //   value: customercategoryValue,
  //   isValid: customercategoryIsValid,
  //   hasError: customercategoryHasError,
  //   valueChangeHandler: customercategoryChangeHandler,
  //   inputBlurHandler: customercategoryBlurHandler,
  //   reset: resetcustomercategory,
  // } = useInputValidation(isNotEmpty);

  const {
    value: customernameValue,
    isValid: customernameIsValid,
    hasError: customernameHasError,
    valueChangeHandler: customernameChangeHandler,
    inputBlurHandler: customernameBlurHandler,
    setInputValue: setcustomernameValue,
    reset: resetcustomername,
  } = useInputValidation(isNotEmpty);

  const [customercategoryValue, setcustomercategoryValue] = useState("state");
  const [smartcity, setSmartCity] = useState("yes");
  const [gstReg, setgstReg] = useState("yes");

  const {
    value: customersubcategoryValue,
    isValid: customersubcategoryIsValid,
    hasError: customersubcategoryHasError,
    valueChangeHandlerForReactSelect: customersubcategoryChangeHandler,
    inputBlurHandler: customersubcategoryBlurHandler,
    setInputValue: setcustomersubcategoryValue,
    reset: resetcustomersubcategory,
  } = useInputValidation(isNotNull);

  const {
    value: stateValue,
    isValid: stateIsValid,
    hasError: stateHasError,
    valueChangeHandlerForReactSelect: stateSelectedValue,
    inputBlurHandler: stateBlurHandler,
    setInputValue: setState,
    reset: resetstate,
  } = useInputValidation(isNotNull);

  const {
    value: countryValue,
    isValid: countryIsValid,
    hasError: countryHasError,
    valueChangeHandlerForReactSelect: countrySelectedValue,
    inputBlurHandler: countryBlurHandler,
    reset: resetcountry,
  } = useInputValidation(isNotNull);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandlerForReactSelect: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    setInputValue: setCity,
    reset: resetcity,
  } = useInputValidation(isNotNull);

  const {
    value: districtValue,
    isValid: districtIsValid,
    hasError: districtHasError,
    valueChangeHandlerForReactSelect: districtSelectedValue,
    inputBlurHandler: districtBlurHandler,
    setInputValue: setDistrict,
    reset: resetdistrict,
  } = useInputValidation(isNotNull);

  const {
    value: pincodeValue,
    isValid: pincodeIsValid,
    hasError: pincodeHasError,
    valueChangeHandler: pincodeChangeHandler,
    inputBlurHandler: pincodeBlurHandler,
    setInputValue: setpincodeValue,
    reset: resetpincode,
  } = useInputValidation(isPincodeValid);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    setInputValue: setphoneValue,
    reset: resetphone,
  } = useInputValidation(isNotEmpty);

  const {
    value: panValue,
    isValid: panIsValid,
    hasError: panHasError,
    valueChangeHandler: panChangeHandler,
    inputBlurHandler: panBlurHandler,
    setInputValue: setpanValue,
    reset: resetpan,
  } = useInputValidation(isPanValid);

  const {
    value: mobilenoValue,
    isValid: mobilenoIsValid,
    hasError: mobilenoHasError,
    valueChangeHandler: mobilenoChangeHandler,
    inputBlurHandler: mobilenoBlurHandler,
    setInputValue: setmobilenoValue,
    reset: resetmobileno,
  } = useInputValidation(isMobileValidation);

  // const {
  //   value: currentyrdateValue,
  //   isValid: currentyrdateIsValid,
  //   hasError: currentyrdateHasError,
  //   valueChangeHandler: currentyrdateChangeHandler,
  //   inputBlurHandler: currentyrdateBlurHandler,
  //   setInputValue: setcurrentyrdateValue,
  //   reset: resetcurrentyrdate,
  // } = useInputValidation(isNotEmpty);

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
    value: gstnoValue,
    isValid: gstnoIsValid,
    hasError: gstnoHasError,
    valueChangeHandler: gstnoChangeHandler,
    inputBlurHandler: gstnoBlurHandler,
    setInputValue: setgstnoValue,
    reset: resetgstno,
  } = useInputValidation(isgstNoValid);

  // const {
  //   value: populationyrdataValue,
  //   isValid: populationyrdataIsValid,
  //   hasError: populationyrdataHasError,
  //   valueChangeHandler: populationyrdataChangeHandler,
  //   inputBlurHandler: populationyrdataBlurHandler,
  //   setInputValue: setpopulationyrdataValue,
  //   reset: resetpopulationyrdata,
  // } = useInputValidation(isNotEmpty);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    setInputValue: setaddressValue,
    reset: resetaddress,
  } = useInputValidation(isNotEmpty);

  const {
    value: websiteValue,
    isValid: websiteIsValid,
    hasError: websiteHasError,
    valueChangeHandler: websiteChangeHandler,
    inputBlurHandler: websiteBlurHandler,
    setInputValue: setwebsiteValue,
    reset: resetwebsite,
  } = useInputValidation(isUrlValid);

  
  useEffect(() => {

    // const getCustCreationMainId = async () => {
    //   let data = {tokenid: localStorage.getItem("token")}
    //   let response = await axios.post(`${baseUrl}/api/customercreationmain/getmainid`, data);
    //   setMainId(response.data.customercreation.id)
    // }

    // const getFormNo = async () => {
    //   let response = await axios.get(`${baseUrl}/api/customercreation/profile/getFormNo`);
    //   setFormNo(response.data.form_no);
    // }



    const getCountryListOptions = async (savedcountry = null) => {
      setCountryOptions((c) => {
        return { ...c, isLoading: true };
      });
      let countryList = await getCountryData(baseUrl, savedcountry);
      setCountryOptions(countryList);
    };

    const getCustomerSubCategoryList = async () => {
      setcustomersubcategoryOptions((c) => {
        return { ...c, isLoading: true };
      });
      let custsubcatlist = await getCustSubCatList(baseUrl,id);
      setcustomersubcategoryOptions(custsubcatlist)
    }


    const setsavedDataToForm = (savedData) => {
      // console.log(savedData)
      setFormId(savedData.id)
      setFormNo(savedData.form_no)
      setcustomernoValue(savedData.customer_no)
      setcustomernameValue(savedData.customer_name)
      setcustomercategoryValue(savedData.customer_category)
      setSmartCity(savedData.smart_city)
      setcustomersubcategoryValue(CustSubCatgyOpts.find((x) => x.value === savedData.customer_sub_category.toString()))
      setpincodeValue(savedData.pincode.toString())
      setphoneValue(savedData.phone.toString())
      setpanValue(savedData.pan)
      setmobilenoValue(savedData.mobile_no.toString())
      // setcurrentyrdateValue(savedData.current_year_date)
      setemailValue(savedData.email)
      setgstReg(savedData.gst_registered)
      savedData.gst_registered === "no" ? setGstNoDisable(true) : setGstNoDisable(false)
      savedData.gst_no === null ? setgstnoValue("") :  setgstnoValue(savedData.gst_no)
     
      // setpopulationyrdataValue(savedData.population_year_data)
      setaddressValue(savedData.address)
      setwebsiteValue(savedData.website)
    }

    const getprofileofcust = async () => {
      let response = await axios.get(`${baseUrl}/api/customercreationprofile/${id}`);
      setsavedDataToForm(response.data.profiledata);
      setSavedData(response.data.profiledata)
      setFormData(response.data.profiledata)
      getCountryListOptions(response.data.profiledata.country);
      getCustomerSubCategoryList();
    }

    // const getProfileFormData = async () => {
    //   let data = {
    //     tokenid: localStorage.getItem("token"),
    //   };

    //   let response = await axios.post(
    //     `${baseUrl}/api/customercreation/profile`,
    //     data
    //   );
    //   if (response.data.profileFormData) {
    //     let savedData = response.data.profileFormData;
    //     savedData !== null && setFormData(savedData);
    //     savedData !== null && setsavedDataToForm(savedData);
    //   }else{
    //     getFormNo();
    //     setLoading(false)
    //   }
    // };


    if(id){
      getprofileofcust();
      setCustomerCreationMainID(id);
    }else{
      getCountryListOptions();
      getCustomerSubCategoryList();
    }
    // getCustCreationMainId()
    // getProfileFormData();
  }, [baseUrl]);

  
  useEffect(() => {
    if (Object.keys(formData).length !== 0 && custsubcategoryOptions.options.length > 0) {
      let sustsubcatSelectedOption = custsubcategoryOptions.options.find(
        (x) => x.value === formData.customer_sub_category
      );
      customersubcategoryChangeHandler(sustsubcatSelectedOption)
      // countryChangeHandler(sustsubcatSelectedOption);
    }
  }, [formData, custsubcategoryOptions.options]);


  useEffect(() => {
    if (Object.keys(formData).length !== 0 && CountryOptions.options.length > 0) {
      let countrySelectedOption = CountryOptions.options.find(
        (x) => x.value === formData.country
      );
      countryChangeHandler(countrySelectedOption);
    }
  }, [formData, CountryOptions.options]);

  useEffect(() => {
    if (Object.keys(formData).length !== 0 && StateOptions.options.length > 0) {
      let StateSelectedOption = StateOptions.options.find(
        (x) => x.value === formData.state
      );
      stateChangeHandler(StateSelectedOption);
    }
  }, [formData, StateOptions.options]);

  useEffect(() => {
    if (Object.keys(formData).length !== 0 && DistrictOptions.options.length > 0) {
      let districtSelectedOption = DistrictOptions.options.find(
        (x) => x.value === formData.district
      );
      districtChangeHandler(districtSelectedOption);
    }
  }, [formData, DistrictOptions.options]);

  useEffect(() => {
    if (Object.keys(formData).length !== 0 && CityOptions.options.length > 0) {
      let citySelectedOption = CityOptions.options.find(
        (x) => x. value === formData.city
        );
        cityChangeHandler(citySelectedOption);
        setFormData({});
        setLoading(false)
      }
    }, [formData, CityOptions.options]);
    
    useEffect(() => { // to auto generate cust no
      if(!id){
        if(stateValue){
          setCustNoFetching(true)
          let shortcode;
    
          smartcity==="yes" ? (shortcode = "SC") : (shortcode = "NC")
    
          axios.get(`${baseUrl}/api/customercreation/getcustno/${stateValue.value}`).then((resp)=>{
            let custno  = resp.data.no;
            custno = String(custno).padStart(2, '0')
            custno = `${stateValue.state_code}-${shortcode}-${custno}`
            setcustomernoValue(custno)
            setCustNoFetching(false)
          })
        
        }
        if(stateValue === null){setcustomernoValue("")}
      }

      if(id && savedData.state && stateValue){
        if(savedData.state === stateValue.value){
          let savedCustNo = savedData.customer_no;
          let savedCustNoArr = savedCustNo.split("-");
          smartcity === "yes" ? setcustomernoValue(`${savedCustNoArr[0]}-SC-${String(savedCustNoArr[2]).padStart(2,'0')}`) : setcustomernoValue(`${savedCustNoArr[0]}-NC-${String(savedCustNoArr[2]).padStart(2,'0')}`)
        }else{
          setCustNoFetching(true)
          let shortcode;
    
          smartcity==="yes" ? (shortcode = "SC") : (shortcode = "NC")
    
          axios.get(`${baseUrl}/api/customercreation/getcustno/${stateValue.value}`).then((resp)=>{
            let custno  = resp.data.no;
            custno = String(custno).padStart(2, '0')
            custno = `${stateValue.state_code}-${shortcode}-${custno}`
            setcustomernoValue(custno)
            setCustNoFetching(false)
          })
        }
      }else if(id && savedData.state && !stateValue && isRendered){
        setcustomernoValue("")
      }


  },[stateValue, smartcity])

  // const getcustno = (selectedOptions) => {

  //   console.log(selectedOptions, smartcity)

  //   if(selectedOptions === null){setcustomernoValue("") ; return;}

  //   if(selectedOptions){
  //     setCustNoFetching(true)
  //     let shortcode;

  //     smartcity==="yes" ? (shortcode = "SC") : (shortcode = "NC")

  //     axios.get(`${baseUrl}/api/customercreation/getcustno/${selectedOptions.value}`).then((resp)=>{
  //       let custno  = resp.data.no;
  //       custno = String(custno).padStart(2, '0')
  //       custno = `${selectedOptions.state_code}-${shortcode}-${custno}`
  //       setcustomernoValue(custno)
  //       setCustNoFetching(false)
  //     })
  //   }
  //   // if(selectedOptions === null){setcustomernoValue("")}
  // }


  const countryChangeHandler = async (selectedOptions) => {
    if (countryValue === selectedOptions && countryValue !== null) {
      return;
    }

    countrySelectedValue(selectedOptions);

    if (selectedOptions === null) {
      resetstatedistrictcity();
      return;
    }
    resetstatedistrictcity();
    // setState(null);
    // setDistrict(null);
    // setCity(null);
    renderStateList(selectedOptions, customercategoryValue)
    
  };

  const renderStateList = async (selectedOptions, category) => {
    setStateoptions({ ...StateOptions, isLoading: true });
    const stateListData = await getSatateData(baseUrl, selectedOptions.value, category, savedData.state);
    setStateoptions(stateListData);
  }

  const stateChangeHandler = async (selectedOptions) => {
    if (stateValue === selectedOptions && stateValue !== null) {
      return;
    }

    stateSelectedValue(selectedOptions);

    if (selectedOptions === null) {
      districtSelectedValue(selectedOptions);
      cityChangeHandler(selectedOptions);

      setDistrictoptions(initialOptions);
      setCityoptions(initialOptions);
      return;
    }

    setDistrict(null);
    setCity(null);
    setDistrictoptions({ ...DistrictOptions, isLoading: true });
    const districtListData = await getDistrictData(
      baseUrl,
      countryValue.value,
      selectedOptions.value,
      savedData.district
    );
    setDistrictoptions(districtListData);
  };

  const districtChangeHandler = async (selectedOptions) => {
    if (districtValue === selectedOptions && districtValue !== null) {
      return;
    }

    districtSelectedValue(selectedOptions);
    if (selectedOptions === null) {
      cityChangeHandler(selectedOptions);

      setCityoptions(initialOptions);
      return;
    }

    setCity(null);
    setCityoptions({ ...CityOptions, isLoading: true });
    const cityListData = await getCityData(
      baseUrl,
      countryValue.value,
      stateValue.value,
      selectedOptions.value,
      savedData.city,
    );
    setCityoptions(cityListData);
    setIsrendered(true)
  };

  const gstregistered = (e) => {
    setgstReg(e.target.value);
    if (e.target.value === "yes") {
      setGstNoDisable(false);
    } else {
      setGstNoDisable(true);
      setgstnoValue("")
    }
  };

  const resetstatedistrictcity = () => {
    stateSelectedValue(null);
    districtSelectedValue(null);
    cityChangeHandler(null);

    setStateoptions(initialOptions);
    setDistrictoptions(initialOptions);
    setCityoptions(initialOptions);
  }

  const customercategoryhandler = (e) => {
      setcustomercategoryValue(e.target.value)
      resetstatedistrictcity();
      renderStateList(countryValue, e.target.value)
  }

  const validateInputLength = (e) => {
    let maxLength =255;
    setaddresslength(maxLength-e.target.value.length);  
  }
  // const ColourOption = [
  //   { value: "ocean", label: "Ocean" },
  //   { value: "blue", label: "Blue" },
  //   { value: "purple", label: "Purple" },
  //   { value: "red", label: "Red" },
  //   { value: "orange", label: "Orange" },
  //   { value: "yellow", label: "Yellow" },
  //   { value: "green", label: "Green" },
  //   { value: "forest", label: "Forest" },
  //   { value: "slate", label: "Slate" },
  //   { value: "silver", label: "Silver" },
  // ];

  let formIsValid = false;

  if (
    customernoValue &&
    customernameIsValid &&
    customersubcategoryIsValid &&
    stateIsValid &&
    countryIsValid &&
    cityIsValid &&
    districtIsValid &&
    addressIsValid &&
    pincodeIsValid &&
    phoneIsValid &&
    panIsValid &&
    mobilenoIsValid &&
    // currentyrdateIsValid &&
    emailIsValid &&
    (gstnoIsValid || GstNoDisable) &&
    // populationyrdataIsValid &&
    websiteIsValid
  ) {
    formIsValid = true;
  }

  const resetall = () => {
    resetcustomerno();
    setcustomercategoryValue("state");
    resetcustomername();
    setSmartCity("yes");
    resetcustomersubcategory();
    resetstate();
    resetcountry();
    resetcity();
    resetdistrict();
    resetpincode();
    resetaddress();
    resetphone();
    resetpan();
    resetmobileno();
    // resetcurrentyrdate();
    resetemail();

    setgstReg("yes");
    resetgstno();
    // resetpopulationyrdata();
    resetwebsite();
  }

  const postData = (data) => {
    axios.post(`${baseUrl}/api/customercreationprofile`, data).then((resp) => {
      console.log(resp);
      if (resp.data.status === 200) {
        setCustomerCreationMainID(resp.data.id)
        toastSuccess(resp.data.message)
        resetall()
        navigate("/tender/master/customercreation/list/main/contactPerson/"+resp.data.id);
      } else if (resp.data.status === 400) {
        toastError(resp.data.message)
      }
      setdatasending(false)
    });
  };

 
  const putData = (data) => {
    axios.put(`${baseUrl}/api/customercreationprofile/${formId}`, data).then((resp) => {
      console.log(resp);
      if (resp.data.status === 200) {
        toastSuccess(resp.data.message)
        navigate(`/tender/master/customercreation/list/main/contactPerson/${formId}`);
      } else if (resp.data.status === 400) {
        toastError(resp.data.message)
      }
      setdatasending(false)
    });
  };


  const submitHandler = (event) => {
    event.preventDefault();
    setdatasending(true)

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    let profileData = {
      customer_no: customernoValue,
      customer_category: customercategoryValue,
      customer_name: customernameValue,
      smart_city: smartcity,
      customer_sub_category: customersubcategoryValue.value,
      country: countryValue.value,
      state: stateValue.value,
      district: districtValue.value,
      city: cityValue.value,
      pincode: pincodeValue,
      address: addressValue,
      phone: phoneValue,
      pan: panValue,
      mobile_no: mobilenoValue,
      // current_year_date: currentyrdateValue,
      email: emailValue,
      gst_registered: gstReg,
      gst_no: gstnoValue,
      // population_year_data: populationyrdataValue,
      website: websiteValue,
      // cust_creation_mainid : mainid,
    };

    let data = {
      profileData: profileData,
      tokenid: localStorage.getItem("token"),
      form_id: formId,
    };
    // console.log(profileData);
    if(formId === 0){
      postData(data);
    }else if(formId > 0){
      putData(data)
    }

  };

  

  return (
    <Fragment>
    
      <div className="formContent">
      {loading && <div className="loading">
        <img id="loading-image" src="/assets/img/282.gif" alt="Loading..." />
      </div> }
      <form onSubmit={submitHandler} >
        {/* <input type = "number" name = "mainid" id = "mainid"  value = {mainid} readOnly={true}/>
        <input type = "number" name = "formNo" id = "formNo"  value = {formNo} readOnly={true}/>
        <input type = "number" name = "formId" id = "formId"  value = {formId} readOnly={true}/>*/}
        <div className="row align-items-center"> 
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="customerno" className="pr-3">Customer No:</label>
                {isCustNoFetching && 
                <><span className="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></span>
                <span className="sr-only">Loading...</span></>}
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="customerno"
                  placeholder=""
                  name="customerno"
                  value={customernoValue}
                  onChange={customernoChangeHandler}
                  onBlur={customernoBlurHandler}
                  disabled={true}
                />
               
                {customernoHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Customer no. is required
                    </span>
                  </div>
                )}

              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customercategory">Customer Category:</label>
              </div>
              <div className="col-lg-8">
                <div className="form-check form-check-inline">
                  <label
                    className="form-check-label"
                    htmlFor="customercategoryyes"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="customercategory"
                      id="customercategoryyes"
                      checked={"state" === customercategoryValue}
                      value="state"
                      onChange={(e) =>{ customercategoryhandler(e); 
                          // getcustno(stateValue)
                        } }
                    />
                    State
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label
                    className="form-check-label"
                    htmlFor="customercategoryno"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="customercategory"
                      id="customercategoryno"
                      checked={"unionterritory" === customercategoryValue}
                      value="unionterritory"
                      onChange={(e) =>{ customercategoryhandler(e);  
                        //  getcustno(stateValue)
                        } }
                    />
                    Union Territory
                  </label>
                </div>
                {/* <input
                  type="text"
                  className="form-control"
                  id="customercategory"
                  placeholder="Enter Customer Category"
                  name="customercategory"
                  value={customercategoryValue}
                  onChange={customercategoryChangeHandler}
                  onBlur={customercategoryBlurHandler}
                /> */}
                {/* {customercategoryHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Customer Category is required
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customername">Customer Name:</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="customername"
                  placeholder="Enter Customer Name"
                  name="customername"
                  value={customernameValue}
                  onChange={customernameChangeHandler}
                  onBlur={customernameBlurHandler}
                />
                {customernameHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Customer Category is required
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="smartcity">Smart City:</label>
              </div>
              <div className="col-lg-8">
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="smartcityyyes">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="smartcity"
                      id="smartcityyyes"
                      checked={"yes" === smartcity}
                      value="yes"
                      onChange={(e) => {setSmartCity(e.target.value); 
                      
                      }}
                    />
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="smartcityno">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="smartcity"
                      id="smartcityno"
                      checked={"no" === smartcity}
                      value="no"
                      onChange={(e) => {setSmartCity(e.target.value); 
                       
                      }}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="customersubcategory">
                  Customer Sub Category:
                </label>
              </div>
              <div className="col-lg-8">
                <Select
                  name="customersubcategory"
                  id="customersubcategory"
                  isSearchable="true"
                  isClearable="true"
                  options={custsubcategoryOptions.options}
                  onChange={customersubcategoryChangeHandler}
                  onBlur={customersubcategoryBlurHandler}
                  value={customersubcategoryValue}
                  isLoading={custsubcategoryOptions.isLoading}
                ></Select>
                {customersubcategoryHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Customer Sub. Category is required
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="country">Country:</label>
              </div>
              <div className="col-lg-8">
                <Select
                  name="country"
                  id="country"
                  isSearchable="true"
                  options={CountryOptions.options}
                  isClearable="true"
                  onChange={countryChangeHandler}
                  onBlur={countryBlurHandler}
                  value={countryValue}
                  isLoading={CountryOptions.isLoading}
                ></Select>
                {countryHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Country is required
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="state">State:</label>
              </div>
              <div className="col-lg-8">
                <Select
                  name="state"
                  id="state"
                  isSearchable="true"
                  isClearable="true"
                  options={StateOptions.options}
                  onChange={(selectedOptions) =>{ stateChangeHandler(selectedOptions); 
                    // getcustno(selectedOptions);
                   }}
                  onBlur={stateBlurHandler}
                  value={stateValue}
                  isLoading={StateOptions.isLoading}
                ></Select>
                {stateHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      State is required
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="distrit">District :</label>
              </div>
              <div className="col-lg-8">
                <Select
                  name="distrit"
                  id="distrit"
                  isSearchable="true"
                  options={DistrictOptions.options}
                  isClearable="true"
                  onChange={districtChangeHandler}
                  onBlur={districtBlurHandler}
                  value={districtValue}
                  isLoading={DistrictOptions.isLoading}
                ></Select>
                {districtHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      District is required
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="city">City/Town/Village:</label>
              </div>
              <div className="col-lg-8">
                <Select
                  name="city"
                  id="city"
                  isSearchable="true"
                  options={CityOptions.options}
                  isClearable="true"
                  onChange={cityChangeHandler}
                  onBlur={cityBlurHandler}
                  value={cityValue}
                  isLoading={CityOptions.isLoading}
                ></Select>
                {cityHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      City is required
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="pincode">Pincode :</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  placeholder="Enter Pincode"
                  name="pincode"
                  value={pincodeValue}
                  onChange={pincodeChangeHandler}
                  onBlur={pincodeBlurHandler}
                />
                {pincodeHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Pincode is  Invalid!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="address">Address : </label>
                <p className="text-info font-weight-bold"><small><b>({addresslen} Characters Remaining) </b></small></p> 
              </div>
              <div className="col-lg-8">
                <textarea
                  className="form-control"
                  id="address"
                  placeholder="Enter Address"
                  name="address"
                  rows="3"
                  onChange={addressChangeHandler}
                  onBlur={addressBlurHandler}
                  value={addressValue}
                  onKeyUp={validateInputLength}
                  maxLength="255"
                ></textarea>
                {addressHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Address is required.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold  mb-4">
              <div className="col-lg-4 text-dark">
                <label htmlFor="phone">Phone :</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Enter Phone No."
                  name="phone"
                  value={phoneValue}
                  onChange={phoneChangeHandler}
                  onBlur={phoneBlurHandler}
                />
                {phoneHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Phone is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="pan">Pan :</label>
                <p className="text-info font-weight-bold"><small><b>(Example: FDTPM0000D)</b></small></p> 
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="pan"
                  placeholder="Enter PAN"
                  name="pan"
                  value={panValue}
                  onChange={panChangeHandler}
                  onBlur={panBlurHandler}
                />
                {panHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      PAN is Invalid.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="mobile">Mobile No :</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="number"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter Mobile No"
                  name="mobile"
                  value={mobilenoValue}
                  onChange={mobilenoChangeHandler}
                  onBlur={mobilenoBlurHandler}
                />
                {mobilenoHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Mobile no is InValid.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="currentyrdate">Current Year/Date :</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  id="currentyrdate"
                  placeholder="Enter Date"
                  name="currentyrdate"
                  value={currentyrdateValue}
                  onChange={currentyrdateChangeHandler}
                  onBlur={currentyrdateBlurHandler}
                />
                {currentyrdateHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      This Field is required
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div> */}
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="email">Email :</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  name="email"
                  value={emailValue}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
                {emailHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Enter Valid e-mail
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="website">Website :</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  placeholder="Enter Website"
                  name="website"
                  value={websiteValue}
                  onChange={websiteChangeHandler}
                  onBlur={websiteBlurHandler}
                />
                {websiteHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Website is Invalid.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4"></div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center">
              <div className="col-lg-4 text-dark font-weight-bold">
                <label htmlFor="gstregistered">GST Registered:</label>
               
              </div>
              <div className="col-lg-8">
                <div className="form-check form-check-inline">
                  <label
                    className="form-check-label"
                    htmlFor="gstregisteredyes"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gstregistered"
                      id="gstregisteredyes"
                      checked={"yes" === gstReg}
                      value="yes"
                      onChange={gstregistered}
                    />
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="gstregisteredno">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gstregistered"
                      id="gstregisteredno"
                      checked={"no" === gstReg}
                      value="no"
                      onChange={gstregistered}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="gstno">GST No. :</label>
                {!GstNoDisable && <p className="text-info font-weight-bold"><small><b>(Ex : 22AAAAA0000A1Z5)</b></small></p> }
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="gstno"
                  placeholder="Enter GST No"
                  name="gstno"
                  value={gstnoValue}
                  onChange={gstnoChangeHandler}
                  onBlur={gstnoBlurHandler}
                  disabled={GstNoDisable}
                />
                {gstnoHasError && !GstNoDisable && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      Enter Valid GST No.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="populationyrdata">Population Year/Data :</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="populationyrdata"
                  placeholder="Enter Population Year/Data"
                  name="populationyrdata"
                  value={populationyrdataValue}
                  onChange={populationyrdataChangeHandler}
                  onBlur={populationyrdataBlurHandler}
                />
                {populationyrdataHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                      This Field is Required
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div> */}
          
          <div className="col-lg-12">
            {!id && <button
              className="btn btn-outline-primary float-right"
              disabled={!formIsValid || isdatasending}
            >
              {isdatasending && "Saving..."}
              {!isdatasending && "Save & Continue"}
            </button>}
            {id && 
              <button
              className="btn btn-outline-primary float-right"
              disabled={!formIsValid || isdatasending}
            >
              {isdatasending && "Updating..."}
              {!isdatasending && "Edit & Continue"}
              </button>}
            <button className="btn  btn-outline-dark mr-3 float-right"
            onClick = {() => navigate("/tender/master/customercreation/list")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      </div>
      
    </Fragment>
  );
};
export default CustomerCreationProfile;
