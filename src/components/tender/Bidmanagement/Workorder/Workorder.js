import { Fragment } from "react";
import CollapseCard from "../../../UI/CollapseCard";

const Workorder = () => {

    return(
        <Fragment>
            <CollapseCard id={"communication"} title={"Communication Files"}>
              <div className="formContent">
                <form>
                  <div className="row align-items-center">
                    <div className="inputgroup col-lg-6 mb-4">
                        <div className="row align-items-center font-weight-bold">
                            <div className="col-lg-4 text-dark">
                            
                              <label className="pr-3">Date :</label>
                               <div>
                                <input 
                                 type="date"
                                 name="date" 
                                 id="date" 
                                 value=""
                                 className="form-control"
                                 />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
              </div>
            </CollapseCard>
        </Fragment>
    )
}

export default Workorder;