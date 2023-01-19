import { Fragment, useEffect, useState } from "react";


const LetterAcceptanceDoc = (props) => {
//   const [preview, setPreview] = useState(undefined);
//   const [isPDF, setIsPDF]=useState(undefined);
//   let pdfFile = "";
//   // const { server1: baseUrl } = useBaseUrl();
//   // const [wofileame, setwofilename] = useState();

//   useEffect(() => {
//     if(props.file === null || props.file === undefined)
//     {
//     if (!props.file && (props.pdfFile !== "" || props.pdfFile !== undefined)) {
//        setPreview(undefined);
      
//       setIsPDF(true);
//       pdfFile=props.pdfFile;
// console.log("In If")

//       // return;
//     }
// else if(props.file.size >0 && (props.pdfFile === "" || props.pdfFile === undefined)){
//   console.log("In Else");
//     const objectUrl = URL.createObjectURL(props.file);
//     setPreview("");
//     setIsPDF(false);
//     setPreview(objectUrl);

//     // free memory when ever this component is unmounted
//     return () => URL.revokeObjectURL(objectUrl);
// }
//     }
//     else{
//       let splitedExt =props.file.name.split(".");
//           if(splitedExt[1]==="pdf")
//           {
//             pdfFile=props.file.name;
//             // setPdfFile(imgUrl);
//             setIsPDF(true);
//           }

//       else{
//         setIsPDF(false);
//       }
//       const objectUrl = URL.createObjectURL(props.file);
//       // setPreview("");
//       // setIsPDF(false);
//       setPreview(objectUrl);
//       return () => URL.revokeObjectURL(objectUrl);
//     }
// //     if (!props.file || props.file.data.type.split("/")[0] !== "image") {
      
// //       setOtherFiles(true);
// //       // return;
// //     }
// // else if (props.file || props.file.data.type.split("/")[0] === "image") {
// //   // console.log("Upload :",props.file.data.type);
// //     const objectUrl = URL.createObjectURL(props.file);
// //     setPreview(objectUrl);

// //     // free memory when ever this component is unmounted
// //     return () => URL.revokeObjectURL(objectUrl);
// // }
// // else{
// //   setOtherFiles(true);
// // }
//   }, [props.file]);



const [preview, setPreview] = useState();

useEffect(() => {
  if (!props.file && (props.pdfFile !== "" || props.pdfFile !== undefined)) {
    // setPreview(undefined);
    setPreview(props.pdfFile);

    // return;
  }
else{
  const objectUrl = URL.createObjectURL(props.file);
  setPreview(objectUrl);

  // free memory when ever this component is unmounted
  return () => URL.revokeObjectURL(objectUrl);
}
}, [props.file]);

  return (
    <Fragment>
      {(props.file && props.file.size>0) && (
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
                      <p className="text-truncate" title={props.file.name}>
                          {props.file.name}
                        </p>
                      <p>({props.file.size / 1000} KB)</p>
                    </div>
                  </div>
                </div>
              </div> 
              <div className="col-md-2 d-flex align-items-center justify-content-center">
              {preview &&  (
              <img
                    className="rounded-circle pointer"
                    id="previewImg"
                    src={(props.pdfFile==="" || props.pdfFile===undefined) ? preview : "assets/icons/pdf_logo.png"}
                    alt="No Image"
                    width="75px"
                    height="75px"
                    onClick={() => window.open(preview, "_blank")}
                    title="Click for Preview"
                    />
              )}

                {/* {preview && (
                  <img
                    className="rounded-circle pointer"
                    id="previewImg"
                    src={preview }
                    // src={preview}
                    alt="No Image"
                    width="75px"
                    height="75px"
                    onClick={() => window.open(preview, "_blank")}
                    title="Click for Preview"
                  />
                )}

                {(!preview && isPDF ) &&(
                  <img
                    src="assets/icons/pdf_logo.png"
                    alt=""
                    width="75px"
                    height="75px"
                    onClick={() => window.open(pdfFile, "_blank")}
                    className="pointer"
                  /> 
                )} */}
                {/* <i className="fas fa-clipboard-list fa-2x " /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LetterAcceptanceDoc;
