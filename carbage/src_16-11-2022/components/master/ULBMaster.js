import {useState} from "react";

const ULBMaster = () => {

    return( 
        <div className="container">
            <div className="row">
                <div className="col-5"><label>Enter LocalBody Name :</label></div>
                <div className="col-5"><input type="text" value="" id="ulbName"/></div>   
            </div>
            <div className="row">
                <div className="col-5"><label>Active Status :</label></div>
                <div className="col-5"><input className="form-check-input" type="radio" value="Active" id="ulbStatus"/><input classname="ml-5" type="radio" value="InActive" id="stateStatus"/></div>   
            </div>
        </div>        
        
        
    );

}; 

export default ULBMaster;