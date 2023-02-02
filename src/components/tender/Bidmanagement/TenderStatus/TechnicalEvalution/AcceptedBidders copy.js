import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import Swal from "sweetalert2";
import PreLoader from "../../../../UI/PreLoader";

const AcceptedBidders = (props) => {
  const [acceptedBidders, setAcceptedBidders] = useState([]);
  const { server1: baseUrl } = useBaseUrl();
  const [input, setInput] = useState({});
  const [FetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    try {
      setFetchLoading(true);
      axios
        .get(
          `${baseUrl}/api/bidmanagement/tenderstatus/acceptedbidders/${props.bidManageMainId}`
        )
        .then((response) => {
          if (response.status === 200) {
            response.data.bidders.map((bidders) => {
              setInput((prev) => {
                return {
                  ...prev,
                  [bidders.competitorId]: {
                    [bidders.competitorId + "status"]: "",
                    reason: "",
                  },
                };
              });
            });
            console.log("input", input);
            setAcceptedBidders(response.data.bidders);
          }
        });
        setFetchLoading(false);
    } catch (e) {
      setFetchLoading(false);
      Swal.fire({
        icon: "error",
        title: "Unable to Load Data",
        timer: 2000,
      });
    }
  }, [props.bidManageMainId]);

  const textInputHandler = (id, e) => {
    e.persist();
    setInput((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          [e.target.name]: e.target.value,
        },
      };
    });
  };
  console.log("input", input);

  return (
    <Fragment>
      <PreLoader loading={FetchLoading}>
      {acceptedBidders.map((item) => {
        return (
          <div className="row mb-2" key={item.competitorId}>
            <div className="col-sm-1"> </div>
            <div className="col-lg-4 text-dark text-left mr-4">
              <label>{item.compName}</label>
            </div>

            <div className="col-lg-3 text-left">
              <label
                className="form-check-label pointer"
                htmlFor={item.competitorId + "statusqulaified"}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  id={item.competitorId + "statusqulaified"}
                  name={item.competitorId + "status"}
                  value="qualified"
                  checked={
                    input &&
                    input[item.competitorId] &&
                    input[item.competitorId][item.competitorId + "status"] &&
                    (input[item.competitorId][item.competitorId + "status"]
                      ? input[item.competitorId][
                          item.competitorId + "status"
                        ] === "qualified"
                      : false)
                  }
                  onChange={(event) =>
                    textInputHandler(item.competitorId, event)
                  }
                />
                Qualified
              </label>

              <label
                className="pl-5 form-check-label pointer"
                htmlFor={item.competitorId + "statusnotqulaified"}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  id={item.competitorId + "statusnotqulaified"}
                  name={item.competitorId + "status"}
                  value="not qualified"
                  checked={
                    input &&
                    input[item.competitorId] &&
                    input[item.competitorId][item.competitorId + "status"] &&
                    (input[item.competitorId][item.competitorId + "status"]
                      ? input[item.competitorId][
                          item.competitorId + "status"
                        ] === "not qualified"
                      : false)
                  }
                  onChange={(event) =>
                    textInputHandler(item.competitorId, event)
                  }
                />
                Not Qualified
              </label>
            </div>
            {input[item.competitorId][item.competitorId + "status"]==="not qualified" &&
            <div className="col-lg-4 text-left row">
              <div className="col-lg-3">
                <label>Reason :</label>
              </div>
              <div className="col-lg-9">
                <textarea
                  className="form-control"
                  name="reason"
                  rows="2"
                  value={input[item.competitorId]?.reason}
                  onChange={(event) =>
                    textInputHandler(item.competitorId, event)
                  }
                />
              </div>
            </div>}
          </div>
        );
      })}
      </PreLoader>
    </Fragment>
  );
};

export default AcceptedBidders;
