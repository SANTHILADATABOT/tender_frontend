import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";
import Select from "react-select";
import { useBaseUrl } from "../../hooks/useBaseUrl";
import axios from "axios";
import Swal from "sweetalert2/src/sweetalert2.js";

const initialState = {
  organisation: null,
  customerName: null,
  nitDate: null,
  tenderType: "",
};

const initialStateErr = {
  organisationErr: "",
  customerNameErr: "",
  nitDateErr: "",
  tenderTypeErr: "",
};

const Tendercreation = () => {
  usePageTitle("Tender Creation");
  const { id } = useParams();
  // const navigate = useNavigate();

  const { server1: baseUrl } = useBaseUrl();

  const [dataSending, setDataSending] = useState(false);
  const [input, setInput] = useState(initialState);
  const [inputValidation, setInputValidation] = useState(initialStateErr);
  const [organisationList, setOrganisationList] = useState();
  const [customerNameList, setCustomerNameList] = useState();
  const [tenderTypeList, setTenderTypeList] = useState();

  const [savedData, setSavedData] = useState({});

  useEffect(() => {
    getOrganisationList();
    getCustomerNameList();
    getTenderTypeList();
  }, []);

  const getOrganisationList = () => {
    axios.get(`${baseUrl}/api/organisation/list`).then((resp) => {
      setOrganisationList(resp.data.organisationList);
    });
  };
  const getCustomerNameList = () => {
    axios.get(`${baseUrl}/api/customerName/list`).then((resp) => {
      setCustomerNameList(resp.data.customerNameList);
    });
  };

  const getTenderTypeList = () => {
    axios.get(`${baseUrl}/api/tenderType/list`).then((resp) => {
      setTenderTypeList(resp.data.tenderTypeList);
    });
  };

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const inputHandlerForSelect = (value, action) => {
    setInput({
      ...input,
      [action.name]: value,
    });
  };

  const postData = (data) => {
    axios.post(`${baseUrl}/api/city`, data).then((resp) => {
      if (resp.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "New City " + resp.data.message,
          text: "",
          confirmButtonColor: "#5156ed",
        });
        setInput(initialState);
      } else if (resp.data.status === 400) {
        Swal.fire({
          icon: "error",
          title: "City",
          text: resp.data.errors,
          confirmButtonColor: "#5156ed",
        });
        setDataSending(false);
      }
    });
  };

  const putData = (data, id) => {
    axios.put(`${baseUrl}/api/city/${id}`, data).then((res) => {
      if (res.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "City",
          text: "Updated Successfully!",
          confirmButtonColor: "#5156ed",
        });
        setInput(initialState);
      } else if (res.data.status === 400) {
        Swal.fire({
          icon: "error",
          title: "City",
          text: res.data.errors,
          confirmButtonColor: "#5156ed",
        });
        setDataSending(false);
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setDataSending(true);
    var errors = { ...inputValidation };

    input.organisation === null
      ? (errors.organisationErr = "Select Organisation")
      : (errors.organisationErr = "");
    input.customerName === null
      ? (errors.customerNameErr = "Select Customer Name")
      : (errors.customerNameErr = "");
    input.nitDate === null
      ? (errors.nitDateErr = "Select District")
      : (errors.nitDateErr = "");
    input.tenderTypeList === ""
      ? (errors.tenderTypeErr = "Enter City Name")
      : (errors.tenderTypeErr = "");

    const { customerNameErr, organisationErr, nitDateErr, tenderTypeErr } =
      errors;
    setInputValidation(errors);

    if (
      customerNameErr !== "" ||
      organisationErr !== "" ||
      nitDateErr !== "" ||
      tenderTypeErr !== ""
    ) {
      setDataSending(false);
      return;
    }

    if (
      customerNameErr === "" &&
      organisationErr === "" &&
      nitDateErr === "" &&
      tenderTypeErr === ""
    ) {
      const data = {
        organisation_id: input.organisation.value,
        customerName_id: input.customerName.value,
        district_id: input.district.value,
        city_name: input.city,
        city_status: input.status,
      };

      if (!id) {
        postData(data);
      } else {
        putData(data, id);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="card p-4">
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col-lg-2">
              <label>Organisation</label>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="row">
                <div className="col-5 mr-5 ">
                  <Select
                    name="organisation"
                    id="organisation"
                    isSearchable="true"
                    isClearable="true"
                    options={organisationList}
                    onChange={inputHandlerForSelect}
                    // onBlur={organisationlistBlurHandler}
                    value={input.organisation}
                  ></Select>
                </div>

                <span style={{ color: "red" }}>
                  {inputValidation.organisationErr}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <label>Customer Name</label>
            </div>
            <div className="col-10 mb-3">
              <div className="row">
                <div className="col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    placeholder="Enter Customer Name"
                    name="customerName"
                    value={input.customerName}
                    onChange={inputHandler}
                  />

                  {inputValidation.customerNameErr && (
                    <div className="pt-1">
                      <span className="text-danger font-weight-bold">
                        Enter Valid Input..!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <label>Tender Type</label>
            </div>
            <div className="col-10 mb-3">
              <div className="row">
                <div className="col-5 mr-5 ">
                  <Select
                    name="tenderType"
                    id="tenderType"
                    isSearchable="true"
                    isClearable="true"
                    options={tenderTypeList}
                    onChange={inputHandlerForSelect}
                    value={input.tenderType}
                  ></Select>
                </div>
                <div className="col-6 ml-n5 mt-2">
                  <span style={{ color: "red" }}>
                    {inputValidation.nitDateErr}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <label>Nit Date</label>
            </div>
            <div className="col-10 mb-3">
              <div className="row">
                <div className="col-5 mr-5 ">
                  <input
                    className="form-control "
                    type="Date"
                    id="city"
                    name="city"
                    onChange={inputHandler}
                    value={input.city}
                  />
                </div>
                <div className="col-6 ml-n5 mt-2">
                  <span style={{ color: "red" }}>
                    {inputValidation.tenderTypeErr}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-12">
              {id ? (
                <button className="btn btn-primary" disabled={dataSending}>
                  {dataSending ? "Editing..." : "Edit"}
                </button>
              ) : (
                <button className="btn btn-primary" disabled={dataSending}>
                  {dataSending ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tendercreation;
