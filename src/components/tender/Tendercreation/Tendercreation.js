import { usePageTitle } from "../../hooks/usePageTitle";
function Tendercreation() {

  usePageTitle("Tender Creation")
  return (
    <>
      {/* Page Heading */}
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-12">
            {/* Circle Buttons */}
            <div className="card shadow mb-4">
              <div className="card-body">
                <div>
                  <form>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="uname">Organization:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="uname"
                          placeholder="Enter username"
                          name="uname"
                          required
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="uname">Customer Name:</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          name="pswd"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tendercreation;
