import { Fragment, useEffect, useState } from "react";
// import { ImageConfig } from "../../Config";
import { ImageConfig } from "../../../../hooks/Config";

const Docsupload = (props) => {
  const [preview, setPreview] = useState("");
  const [doc, setDoc] = useState("");
  const [filesize, setFileSize] = useState(0);
  const [documentName, setDocumentName] = useState("");
  const [ext, setExt] = useState("");
  const [filePreviewExt, setFilePreviewExt] = useState("");
  var objectUrl = "";
// console.log('props',props);
  useEffect(() => {
    console.log("setDoc")
    if (props.file.hasOwnProperty("data")) {
      setDoc(props.file.data);
      setFileSize(props.file.data.size);
    } else {
      setDoc(props.file);
      setFileSize(props.file.size);
      // props.setFileName("");
    }
 

    if (props.fileName && !props.file.name){
      setDocumentName(props.fileName[0]);
    } else if (props.file.name) {
      props.setFileName("");
      setDocumentName(props.file.name);
    } else {
      setDocumentName("");
    }
  }, [props.file]);

 
  useEffect(() => {
    // if (
    //   props.hasOwnProperty("data") &&
    //   props.file.data.type === "application/octet-stream" &&
    //   documentName
    // ) {
    //   setExt(documentName.split(".")[1]);
    // }
    console.log("doc",doc);
    if (doc) {
      setFilePreviewExt(
        doc.type.split("/")[0] === "image"
          ? ""
          : doc.type.split("/")[0] === "application"
          ? doc.type.split("/")[1] === "octet-stream"
            ? documentName.split(".")[1]
            : doc.type.split("/")[1] 
          : doc.type.split("/")[0] === "text"
          ? doc.type.split("/")[1]
          : doc.type === ""
          ? doc.name.split(".")[doc.name.split(".").length - 1] === "rar"
            ? "rar"
            : "default"
          : "default"
      );
    }
  }, [documentName]);

  console.log("FilePreviewExt",filePreviewExt);
  // let documentName =props.file?.name !== undefined ? props.file.name : props.fileName;

  useEffect(() => {
    if (
      !doc ||
      (doc.type.split("/")[0] !== "image" &&
        doc.type.split("/")[0] !== "application" &&
        doc.type.split("/")[0] !== "text" && 
         doc.name.split(".")[doc.name.split(".").length - 1]!=='rar')
    ) {
      setPreview("");
      return;
    }

    objectUrl = URL.createObjectURL(doc);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [doc]);

  const downloadDoc = (e) => {
    e.preventDefault();
    const url = window.URL.createObjectURL(doc);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", documentName);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  };

  const onDelete = () => {
    props.setFile("");
  };

  const showPreview = (e) => {
    e.preventDefault();
    if(filePreviewExt==="" )
    {if (props.file !== "" && props.file.data.type.split("/")[0] === "image") {
      return window.open(preview), "_blank";
    }}
  };

  return (
    <Fragment>
      {props.file && (
        <div className="card border-left-info shadow py-2 w-100 my-4">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col-md-9">
                <div className="font-weight-bold text-info text-uppercase mb-1">
                  {props.docName}
                </div>
                <div className="row no-gutters align-items-center ">
                  <div className="col-auto">
                    <div className="h6 mb-0 mr-4 font-weight-bold text-gray-800 ">
                      <p className="text-truncate" title={documentName}>
                        {documentName}
                      </p>
                      <p>
                        <span>({filesize / 1000} KB)</span>
                        <span
                          className="btn btn-outline-warning btn-small  py-0 px-1 ml-3 mr-1"
                          onClick={e =>downloadDoc(e)}
                        >
                          <i className="fa fa-download"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {preview && (
                <div className="col-md-3 d-flex align-items-center justify-content-center ml-n2">
                  <img
                    className="rounded-circle pointer"
                    id="previewImg"
                    src={filePreviewExt ? ImageConfig[filePreviewExt] : preview}
                    alt="No Image"
                    width="75px"
                    height="75px"
                    onClick={(e) => showPreview(e)}
                    title="Click for Preview"
                  />
                  <div
                    className="pointer fa fa-close text-danger h5 closebtn mt-3 ml-1"
                    onClick={onDelete}
                  ></div>
                </div>
              )}
              {/* {!preview && (
              <div className="col-md-2 d-flex align-items-center justify-content-center ml-n3">
                <img
                  src={
                    ImageConfig[props.file.data.type.split("/")[1]] ||
                    ImageConfig["default"]
                  }
                  alt=""
                  width="75px"
                  height="75px"
                  onClick={() => window.open(preview, "_blank")}
                  title="Click for Preview13"
                />

                <div
                  className="pointer fa fa-close text-danger h5 closebtn mt-3 ml-1"
                  onClick={onDelete}
                ></div>
              </div>
            )} */}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Docsupload;
