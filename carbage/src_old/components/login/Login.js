import './login.css'
import {Link } from 'react-router-dom'


function Login(){
    return(
<div className="bg-gradient-primary ">

   <div className="container">
    {/* Outer Row */}
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* Nested Row within Card Body */}
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block py-3  px-0 mt-2"><center><img src="/assets/icons/logo-zigma.png" alt width="70%" /></center></div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Login</h1>
                  </div>
                  <form className="user">
                    <div className="form-group">
                      <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small">
                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                        <label className="custom-control-label" htmlFor="customCheck">Remember
                          Me</label>
                      </div>
                    </div>
                    <Link to='/master' className="btn btn-primary btn-user btn-block">
                      Login
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

   )
};

export default Login;

