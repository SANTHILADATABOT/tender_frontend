import { Fragment, useEffect } from "react";


const DocList = () => {



    return (
        <Fragment>
            <div className="d-sm-flex align-items-center justify-content-between mt-2 mb-2">
                <h1 className="h4 mb-0 text-primary">List of Uploaded documents</h1>
            </div>
            <div className="overflow-auto doclist">
                <div className="card mb-4 py-1 border-left-info">
                    <div className="row card-body">
                       <div className="col-sm-2">
                            1
                       </div>
                       <div className="col-sm-3">
                            1
                       </div>
                    </div>
                </div>
                
            </div>
        </Fragment>
    )
}

export default DocList;