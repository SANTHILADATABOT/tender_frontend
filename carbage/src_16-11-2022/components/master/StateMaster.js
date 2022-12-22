import {useState} from "react";

const StateMaster = () => {

    return( 
        <div className="container">
            <div className="row">
                <div className="col-5"><label>Enter State Name :</label></div>
                <div className="col-5"><input type="text" value="" id="stateName"/></div>   
            </div>
            <div className="row">
                <div className="col-5"><label>Active Status :</label></div>
                <div className="col-5"><input className="form-check-input" type="radio" value="Active" id="stateStatus"/><input classname="ml-5" type="radio" value="InActive" id="stateStatus"/></div>   
            </div>
        </div>        
        
        
    );

}; 

export default StateMaster;