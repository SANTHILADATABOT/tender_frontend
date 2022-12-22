import { Fragment } from "react";
import Contentwrapper from "./Contentwrapper";
import Pagewrapper from "./Pagewrapper";
import Logout from "./Logout";
import Sidebar from "./Sidebar";



function Masterlayout() {
  return (
  	<Fragment>
     {/* <!-- Page Wrapper --> */}
	   <div id="wrapper">
  
        <Sidebar/>
        <Contentwrapper />
        

    </div>

    {/* <!-- Scroll to Top Button--> */}
    <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
    </a>
     {/* <!-- End of Page Wrapper --> */}

        <Logout/>
    </Fragment>
  );
}

export default Masterlayout;