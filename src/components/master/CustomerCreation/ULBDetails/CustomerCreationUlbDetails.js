import { Fragment, useState } from "react";

const initialState = {
  area: "",
  population2011: "",
  presentpopulation:"",
  wards:"",
  households:"",
};

const CustomerCreationUlbDetails = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(initialState);

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = () => {};
  return (
    <Fragment>
      <div className="formContent">
        {loading && (
          <div className="loading">
            <img
              id="loading-image"
              src="/assets/img/282.gif"
              alt="Loading..."
            />
          </div>
        )}
        <form onSubmit={submitHandler}>
          <div className="row align-items-center">
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="area">Area in Sq.km </label>
                </div>
                <div className="col-lg-8">
                  <input
                    type="text"
                    className="form-control"
                    id="area"
                    name="area"
                    value={input.area}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="population2011">Population as per 2011</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="population2011"
                    name="population2011"
                    value={input.population2011}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="presentpopulation">Present Population</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="presentpopulation"
                    name="presentpopulation"
                    value={input.presentpopulation}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="wards">No. of Wards</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="wards"
                    name="wards"
                    value={input.wards}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="households">No. House holds</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="households"
                    name="households"
                    value={input.households}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="commercial">No. of commercial establishments</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="commercial"
                    name="commercial"
                    value={input.commercial}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="ABbusstand">No. of A&B grade bus stand</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="ABbusstand"
                    name="ABbusstand"
                    value={input.ABbusstand}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="CDbusstand">No. of C&D grade bus stand</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="CDbusstand"
                    name="CDbusstand"
                    value={input.CDbusstand}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="market_morethan_oneacre">No. of markets available (having area more than one acre)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="mamarket_morethan_oneacrerket"
                    name="market_morethan_oneacre"
                    value={input.market_morethan_oneacre}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="market_lessthan_oneacre">No. of markets available (having area less than one acre)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="market_lessthan_oneacre"
                    name="market_lessthan_oneacre"
                    value={input.market_lessthan_oneacre}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="lengthofroad">Total length of Roads (Km)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="lengthofroad"
                    name="lengthofroad"
                    value={input.lengthofroad}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="lengthofrouteroad">Length of route Roads alone (Km)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="lengthofrouteroad"
                    name="lengthofrouteroad"
                    value={input.lengthofrouteroad}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="lengthofotherroad">Length of other roads/streets alone (Km)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="lengthofotherroad"
                    name="lengthofotherroad"
                    value={input.lengthofotherroad}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
             <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="lengthoflanes">Length of other Lanes alone (Km)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="lengthoflanes"
                    name="lengthoflanes"
                    value={input.lengthoflanes}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="lengthofpucca">Length of Pucca drain (Km)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="lengthofpucca"
                    name="lengthofpucca"
                    value={input.lengthofpucca}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="lengthofcutcha">Length of Cutcha drain (Km)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="lengthofcutcha"
                    name="lengthofcutcha"
                    value={input.lengthofcutcha}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="parks">No. of parks available</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="parks"
                    name="parks"
                    value={input.parks}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="parksforpublicuse">No. of parks dedicated to public use</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="parksforpublicuse"
                    name="parksforpublicuse"
                    value={input.parksforpublicuse}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="tricycle">No. of Tricycle available for d2d collection</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="tricycle"
                    name="tricycle"
                    value={input.tricycle}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="bov">No. of bov in working condition</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="bov"
                    name="bov"
                    value={input.bov}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="bovrepair">No. of bov in repair</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="bovrepair"
                    name="bovrepair"
                    value={input.bovrepair}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="lcv">No. of LCV available in working condition</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="lcv"
                    name="lcv"
                    value={input.lcv}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="lcvrepair">No. of LCV available with repair</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="lcvrepair"
                    name="lcvrepair"
                    value={input.lcvrepair}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="compactor">No. of compactor available and its capacity</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="compactor"
                    name="compactor"
                    value={input.compactor}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="hookloaderwithcapacity">No. of Hook loader available and its capacity</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="hookloaderwithcapacity"
                    name="hookloaderwithcapacity"
                    value={input.hookloaderwithcapacity}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="compactorbin">No. of compactor bin available</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="compactorbin"
                    name="compactorbin"
                    value={input.compactorbin}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="hookloader">No. of Hook loader available</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="hookloader"
                    name="hookloader"
                    value={input.hookloader}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="tractortipper">No. of tractor cum tipper vehicle available</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="tractortipper"
                    name="tractortipper"
                    value={input.tractortipper}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="lorries">No. of Lorries available and its capacity</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="lorries"
                    name="lorries"
                    value={input.lorries}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="jcb">No. of JCB available</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="jcb"
                    name="jcb"
                    value={input.jcb}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="bobcat">No. of bobCat available</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="bobcat"
                    name="bobcat"
                    value={input.bobcat}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="sanitaryworkers_sanctioned">No. of sanitary workers (permanent) sanctioned</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="sanitaryworkers_sanctioned"
                    name="sanitaryworkers_sanctioned"
                    value={input.sanitaryworkers_sanctioned}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="sanitaryworkers_inservice">No. of sanitary workers are in service on date (available)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="sanitaryworkers_inservice"
                    name="sanitaryworkers_inservice"
                    value={input.sanitaryworkers_inservice}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="sanitarysupervisor_sanctioned">No. of (permanent) sanitary supervisor sanctioned</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="sanitarysupervisor_sanctioned"
                    name="sanitarysupervisor_sanctioned"
                    value={input.sanitarysupervisor_sanctioned}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="sanitarysupervisor_inservice">No. of sanitary supervisor are in service (available)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="sanitarysupervisor_inservice"
                    name="sanitarysupervisor_inservice"
                    value={input.sanitarysupervisor_inservice}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="permanentdrivers">No. of permanenty drivers sanctioned</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="permanentdrivers"
                    name="permanentdrivers"
                    value={input.permanentdrivers}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="regulardrivers">No. of regular drivers available</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="regulardrivers"
                    name="regulardrivers"
                    value={input.regulardrivers}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="publicgathering">No. of public gathering area (public meeting point)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="publicgathering"
                    name="publicgathering"
                    value={input.publicgathering}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="secondarystorage">No. of secondary storage point if any</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="secondarystorage"
                    name="secondarystorage"
                    value={input.secondarystorage}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="transferstation">No. of Transfer station if any</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="transferstation"
                    name="transferstation"
                    value={input.transferstation}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="households_animatorsurvey">No. of household (as per animator survey)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="households_animatorsurvey"
                    name="households_animatorsurvey"
                    value={input.households_animatorsurvey}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="assessments_residential">No. of assessments (residential)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="assessments_residential"
                    name="assessments_residential"
                    value={input.assessments_residential}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="inputgroup col-lg-6 mb-4">
              <div className="row align-items-center font-weight-bold">
                <div className="col-lg-4 text-dark">
                  <label htmlFor="assessments_commercial">No. of assessments (commercial)</label>
                </div>
                <div className="col-lg-8">
                   <input
                    type="text"
                    className="form-control"
                    id="assessments_commercial"
                    name="assessments_commercial"
                    value={input.assessments_commercial}
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CustomerCreationUlbDetails;
