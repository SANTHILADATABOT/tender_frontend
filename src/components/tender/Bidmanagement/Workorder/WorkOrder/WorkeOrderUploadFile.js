import { Fragment, useEffect, useState } from "react";
import { ImageConfig } from "../../Config";
import axios from "axios";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";

const WorkOrderUploadFile = (props) => {
  const [preview, setPreview] = useState(undefined);
  // const { server1: baseUrl } = useBaseUrl();
  // const [wofileame, setwofilename] = useState();

  useEffect(() => {
    if (!props.file || props.file.type.split("/")[0] !== "image") {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(props.file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [props.file]);

  // const setWorkOrderwoimage = (response) => {
  //   let data = response.data.doc[0];
  //   setwofilename(data.wofile);
  // };

  // //work order image data
  // const getWorkOrderwoimagemname = async () => {
  //   let response = await axios.get(
  //     `${baseUrl}/api/workorder/creation/Workorder/getimagename/${props.id}`
  //   );
  //   if (response.status === 200) {
  //     setWorkOrderwoimage(response);
  //   }
  // };

  // useEffect(() => {
  //   if (props.id) {
  //     getWorkOrderwoimagemname();
  //   }
  // }, []);

  return (
    <Fragment>
      {props.file && (
        <div className="card border-left-info shadow py-2 w-100 my-4">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col-md-10">
                <div className="font-weight-bold text-info text-uppercase mb-1">
                  {props.docName}
                </div>
                <div className="row no-gutters align-items-center ">
                  <div className="col-auto">
                    <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 ">
                      {/* {props.file.name ? (
                        <p className="text-truncate" title={props.file.name}>
                          {props.file.name}
                        </p>
                      ) : (
                        <p>{wofileame}</p>
                      )} */}
                      <p className="text-truncate" title={props.file.name}>
                          {props.file.name}
                        </p>
                      <p>({props.file.size / 1000} KB)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-center">
                {preview && (
                  <img
                    className="rounded-circle pointer"
                    id="previewImg"
                    src={preview}
                    alt="No Image"
                    width="75px"
                    height="75px"
                    onClick={() => window.open(preview, "_blank")}
                    title="Click for Preview"
                  />
                )}

                {!preview && (
                  <img
                    src={
                      ImageConfig[props.file.type.split("/")[1]] ||
                      ImageConfig["default"]
                    }
                    alt=""
                    width="75px"
                    height="75px"
                  />
                )}
                {/* <i className="fas fa-clipboard-list fa-2x " /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default WorkOrderUploadFile;
