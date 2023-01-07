import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";

function Bidmanagement(props)
{
	return(
	<>
		<div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="float-right ">
                  <Link to ="main/bidcreationmain"  /*onClick={createCustomer}*/ className="rounded-pill btn btn-primary btn-icon-split">
                    <span className="icon text-white-50">
                      <i className="fas fa-plus-circle" />
                    </span>
                    <span className="text">New</span>
                  </Link>
                </div>
                
              </div>
              <div>
                {/* <CustomerCreationList /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
	</>
	);
}

export default Bidmanagement;