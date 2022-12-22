import { useState, useEffect } from "react";
import { usePageTitle } from "../../hooks/usePageTitle";
import Swal from "sweetalert2/src/sweetalert2.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useBaseUrl } from "../../hooks/useBaseUrl";

const StateMaster = () => {
  usePageTitle("State Master Creation");
  useDocumentTitle("State Master");
  const {server1: baseUrl} = useBaseUrl()
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = {
    countryName: null,
    stateName: "",
    stateStatus: "Active",
  };

  const [stateInput, setStateInput] = useState(initialState);
  const [stateValidation, setInputValidation] = useState({
    stateName: "",
    countryName: "",
  });
  const [countryList, setCountryList] = useState([]);
  const [dataSending, setDataSending] = useState(false);

  useEffect(() => {
    axios.get(`${baseUrl}/api/country/list`).then((resp) => {
      setCountryList(resp.data.countryList);
    });
  }, [baseUrl]);

  useEffect(() => {
    if (id) {
      axios.get(`${baseUrl}/api/state/${id}`).then((resp) => {
     
        setStateInput({
          countryName: countryList.find(
            (x) => x.value === resp.data.state.country_id
          ),
          stateName: resp.data.state.state_name,
          stateStatus: resp.data.state.state_status,
        });
      });
    }
  }, [id, countryList, baseUrl]);

  const inputHandler = (e) => {
    e.persist();
    setStateInput({ ...stateInput, [e.target.name]: e.target.value });
  };

  const inputHandlerForSelect = (value, action) => {
    setStateInput({
      ...stateInput,
      [action.name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setDataSending(true);
    var errors = { ...stateValidation };

    stateInput.countryName === null
      ? (errors.countryName = "Select Country")
      : (errors.countryName = "");
    stateInput.stateName === ""
      ? (errors.stateName = "Please Enter State")
      : (errors.stateName = "");

    const { stateName, countryName } = errors;
    setInputValidation(errors);

    if (stateName !== "" || countryName !== "") {
      setDataSending(false)
      return;
    }

    if (stateName === "" && countryName === "") {
      const data = {
        country_id: stateInput.countryName.value,
        state_name: stateInput.stateName,
        state_status: stateInput.stateStatus,
      };

      if (!id) {
        axios.post(`${baseUrl}/api/state`, data).then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              icon: "success",
              title: "State",
              text: "Created Successfully!",
              confirmButtonColor: "#5156ed",
            });
            setStateInput(initialState);
            navigate("/tender/master/statemaster");
          } else if (res.data.status === 400) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.data.errors,
              confirmButtonColor: "#5156ed",
            });
            setDataSending(false)
          }
         
        });
      } else {
        axios.put(`${baseUrl}/api/state/${id}`, data).then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              icon: "success",
              title: "State",
              text: "Updated Successfully!",
              confirmButtonColor: "#5156ed",
            });
            setStateInput(initialState);
            navigate("/tender/master/statemaster");
          } else if (res.data.status === 400) {
            Swal.fire({
              icon: "error",
              title: "State",
              text: res.data.errors,
              confirmButtonColor: "#5156ed",
            });
            setDataSending(false)
          }
        });
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="card p-4">
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col-2">
              <label>Country Name</label>
            </div>
            <div className="col-10 mb-3">
              <div className="row">
                <div className="col-5 mr-5 ">
                  <Select
                    name="countryName"
                    id="countryName"
                    isSearchable="true"
                    isClearable="true"
                    options={countryList}
                    onChange={inputHandlerForSelect}
                    // onBlur={countrylistBlurHandler}
                    value={stateInput.countryName}
                  ></Select>
                </div>
                <div className="col-6 ml-n5 mt-2">
                  <span style={{ color: "red" }}>
                    {stateValidation.countryName}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <label>State Name</label>
            </div>
            <div className="col-10 mb-3">
              <div className="row">
                <div className="col-5 mr-5 ">
                  <input
                    className="form-control "
                    type="text"
                    id="stateName"
                    name="stateName"
                    onChange={inputHandler}
                    value={stateInput.stateName}
                  />
                </div>
                <div className="col-6 ml-n5 mt-2">
                  <span style={{ color: "red" }}>
                    {stateValidation.stateName}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <label>Active Status</label>
            </div>

            <div className="col-5 ml-3">
              <div className="row">
                <div className="col-3">
                  <label
                    className="for-check-label"
                    htmlFor="stateStatusActive"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      id="stateStatusActive"
                      name="stateStatus"
                      value="Active"
                      checked={stateInput.stateStatus === "Active"}
                      onChange={inputHandler}
                    />
                    Active
                  </label>
                </div>
                <div className="col-5">
                  <label
                    className="for-check-label"
                    htmlFor="stateStatusInactive"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      id="stateStatusInactive"
                      name="stateStatus"
                      value="InActive"
                      checked={stateInput.stateStatus === "InActive"}
                      onChange={inputHandler}
                    />
                    InActive
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12">
              {id ? (
                <button className="btn btn-primary" disabled={dataSending}>
                  {dataSending ? "Editing..." : 'Edit'}
                </button>
              ) : (
                <button className="btn btn-primary" disabled={dataSending}>
                   {dataSending ? "Submitting..." : 'Submit'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StateMaster;
