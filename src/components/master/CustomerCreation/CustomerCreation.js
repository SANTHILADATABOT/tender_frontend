import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";
import axios from "axios";
import { useBaseUrl } from "../../hooks/useBaseUrl";
import CustomerCreationList from "./CustomerCreationList";

const CustomerCreation = () => {
  usePageTitle("Customer Creation");
  const { server1: baseUrl } = useBaseUrl();
  const navigate = useNavigate();
  const location = useLocation();
  

  const createCustomer = async () => {
    let data = {
      tokenid: localStorage.getItem("token"),
    };

    let response = await axios.post(
      `${baseUrl}/api/customercreationmain`,
      data
    );

    if(response.status === 200){
      navigate(`${location.pathname}/main/profile`)
    }else{
      alert("Unable to process, please try again later");
    }
 
  }

  const data = {
    byclicking: 'new'
   }

  return (
    <>
      {/* Page Heading */}
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="float-right ">
                  <Link to ="main/profile" state={{ data: data }}  className="rounded-pill btn btn-primary btn-icon-split">
                    <span className="icon text-white-50">
                      <i className="fas fa-plus-circle" />
                    </span>
                    <span className="text">New</span>
                  </Link>
                </div>
                
              </div>
              <div>
                <CustomerCreationList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerCreation;
