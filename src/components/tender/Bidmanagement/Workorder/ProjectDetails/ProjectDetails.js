import React from 'react';
import CollapseCard from "../../../../UI/CollapseCard";
import useInputValidation from "../../../../hooks/useInputValidation";
import {
  isNotEmpty,
  isNotNull,
} from "../../../CommonFunctions/CommonFunctions";


const ProjetDetails = () => {

    const {
        value: proPeriodvalue,
        isValid: proPeriodIsValid,
        hasError: proPeriodHasError,
        valueChangeHandler: proPeriodChangeHandler,
        inputBlurHandler: proPeriodBlurHandler,
        setInputValue: setproPeriodValue,
        reset: resetproPeriod,
      } = useInputValidation(isNotEmpty);

    const {
        value: mobPeriodvalue,
        isValid: mobPeriodIsValid,
        hasError: mobPeriodHasError,
        valueChangeHandler: mobPeriodChangeHandler,
        inputBlurHandler: mobPeriodBlurHandler,
        setInputValue: setmobPeriodValue,
        reset: resetmobPeriod,
      } = useInputValidation(isNotEmpty);

      const {
        value: monsoonPeriodvalue,
        isValid: monsoonPeriodIsValid,
        hasError: monsoonPeriodHasError,
        valueChangeHandler: monsoonPeriodChangeHandler,
        inputBlurHandler: monsoonPeriodBlurHandler,
        setInputValue: setmonsoonPeriodValue,
        reset: resetmonsoonPeriod,
      } = useInputValidation(isNotEmpty);

      const {
        value: monthDurationvalue,
        isValid: monthDurationIsValid,
        hasError: monthDurationHasError,
        valueChangeHandler: monthDurationChangeHandler,
        inputBlurHandler: monthDurationBlurHandler,
        setInputValue: setmonthDurationValue,
        reset: resetmonthDuration,
      } = useInputValidation(isNotEmpty);

      const {
        value: supplyScapevalue,
        isValid: supplyScapeIsValid,
        hasError: supplyScapeHasError,
        valueChangeHandler: supplyScapeChangeHandler,
        inputBlurHandler: supplyScapeBlurHandler,
        setInputValue: setsupplyScapeValue,
        reset: resetsupplyScape,
      } = useInputValidation(isNotEmpty);

      const {
        value: supplyDatevalue,
        isValid: supplyDateIsValid,
        hasError: supplyDateHasError,
        valueChangeHandler: supplyDateChangeHandler,
        inputBlurHandler: supplyDateBlurHandler,
        setInputValue: setsupplyDateValue,
        reset: resetsupplyDate,
      } = useInputValidation(isNotEmpty);

      const {
        value: erectionStartvalue,
        isValid: erectionStartIsValid,
        hasError: erectionStartHasError,
        valueChangeHandler: erectionStartChangeHandler,
        inputBlurHandler: erectionStartBlurHandler,
        setInputValue: seterectionStartValue,
        reset: reseterectionStart,
      } = useInputValidation(isNotEmpty);

      const {
        value: commercialProducvalue,
        isValid: commercialProducIsValid,
        hasError: commercialProducHasError,
        valueChangeHandler: commercialProducChangeHandler,
        inputBlurHandler: commercialProducBlurHandler,
        setInputValue: setcommercialProducValue,
        reset: resetcommecrcialProduc,
      } = useInputValidation(isNotEmpty);

      const {
        value: tarCompletionvalue,
        isValid: tarCompletionIsValid,
        hasError: tarCompletionHasError,
        valueChangeHandler: tarCompletionChangeHandler,
        inputBlurHandler: tarCompletionBlurHandler,
        setInputValue: settarCompletionValue,
        reset: resettarCompletion,
      } = useInputValidation(isNotEmpty);

      const {
        value: producComletionvalue,
        isValid: producCompletionIsValid,
        hasError: producCompletionHasError,
        valueChangeHandler: producCompletionChangeHandler,
        inputBlurHandler: producCompletionBlurHandler,
        setInputValue: setproducCompletionValue,
        reset: resetproducCompletion,
      } = useInputValidation(isNotEmpty);
    

      let formIsValid = false;

  if (
    proPeriodIsValid && mobPeriodIsValid && monsoonPeriodIsValid && monthDurationIsValid && supplyScapeIsValid && supplyDateIsValid && erectionStartIsValid && commercialProducIsValid && tarCompletionIsValid && producCompletionIsValid
    
  ) {
    formIsValid = true;
  }

  

return(
    <CollapseCard id={"ProjectDetails"} title={"Project details"}>
        <form >
        <div className="row align-items-center ">
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="date">Project Period In Month</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="ProPeriod"
                  id="ProPeriod"
                  className="form-control"
                  value={proPeriodvalue}
                  onChange={proPeriodChangeHandler}
                  onBlur={proPeriodBlurHandler}
                />
                {proPeriodHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    Project Period In Month is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="refrence_no">Mobilization Period In Month</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="mobPeriod"
                  id="mobPeriod"
                  className="form-control"
                  value={mobPeriodvalue}
                  onChange={mobPeriodChangeHandler}
                  onBlur={mobPeriodBlurHandler}
                />
                {mobPeriodHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    Mobilization Period In Month is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="from">Monsoon Period In Months</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="monsoonPeriod"
                  id="monsoonPeriod"
                  className="form-control"
                  value={monsoonPeriodvalue}
                  onChange={monsoonPeriodChangeHandler}
                  onBlur={monsoonPeriodBlurHandler}
                />
                {monsoonPeriodHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    Monsoon Period In Months  is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="to">Total Duration In Months</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="monthDuration"
                  id="monthDuration"
                  className="form-control"
                  value={monthDurationvalue}
                  onChange={monthDurationChangeHandler}
                  onBlur={monthDurationBlurHandler}
                />
                {monthDurationHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                     Total  Duration In Months is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>       
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label>Power supply Scape</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="supplyScape"
                  id="supplyScape"
                  className="form-control"
                  value={supplyScapevalue}
                  onChange={supplyScapeChangeHandler}
                  onBlur={supplyScapeBlurHandler}
                />
                {supplyScapeHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    Power supply Scape Submission is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="refrence_no">Power Supply Date</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="supplyDate"
                  id="supplyDate"
                  className="form-control"
                  value={supplyDatevalue}
                  onChange={supplyDateChangeHandler}
                  onBlur={supplyDateBlurHandler}
                />
                {supplyDateHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                       Power Supply Date is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="refrence_no">Date Of Erection Started</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="erectionStart"
                  id="erectionStart"
                  className="form-control"
                  value={erectionStartvalue}
                  onChange={erectionStartChangeHandler}
                  onBlur={erectionStartBlurHandler}
                />
                {erectionStartHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    Date Of Erection Started is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="refrence_no">Date Of Commercial Production</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="commercialProduc"
                  id="commercialProduc"
                  className="form-control"
                  value={commercialProducvalue}
                  onChange={commercialProducChangeHandler}
                  onBlur={commercialProducBlurHandler}
                />
                {commercialProducHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    Date Of Commercial Production is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="refrence_no">Target Date For Completion</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="tarCompletion"
                  id="tarCompletion"
                  className="form-control"
                  value={tarCompletionvalue}
                  onChange={tarCompletionChangeHandler}
                  onBlur={tarCompletionBlurHandler}
                />
                {tarCompletionHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    Target Date For Completion is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="inputgroup col-lg-6 mb-4">
            <div className="row align-items-center font-weight-bold">
              <div className="col-lg-4 text-dark">
                <label htmlFor="refrence_no">Completion Date Production</label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  name="producCompletion"
                  id="producCompletion"
                  className="form-control"
                  value={producComletionvalue}
                  onChange={producCompletionChangeHandler}
                  onBlur={producCompletionBlurHandler}
                />
                {producCompletionHasError && (
                  <div className="pt-1">
                    <span className="text-danger font-weight-normal">
                    Completion Date Production is invalid
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
        {/* <div className="row text-center">
          <div className="col-12">
            {id ? (
              <button
                className="btn btn-primary"
                disabled={!formIsValid || dataSending}
              >
                {dataSending ? "Editing..." : "Edit"}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!formIsValid || dataSending}
              >
                {dataSending ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div> */}
      </form>
    </CollapseCard>
);
}

export default ProjetDetails;