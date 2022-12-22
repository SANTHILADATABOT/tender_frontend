import { Fragment } from "react"
import { Link } from "react-router-dom"
import { usePageTitle } from "../../hooks/usePageTitle"
import CityMasterList from "./CityMasterList"

const CityMasterView = () => {
    usePageTitle("City Master List")
    return (
    <Fragment>
      {/* Page Heading */}
      <div className="container-fluid p-0">
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="float-right">
                  <Link
                    to="citycreation"
                    className="btn btn-primary btn-icon-split rounded-pill"
                  >
                    <span className="icon text-white-50">
                      <i className="fas fa-plus-circle" />
                    </span>
                    <span className="text">New</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-12">
                <CityMasterList/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    )
}

export default CityMasterView