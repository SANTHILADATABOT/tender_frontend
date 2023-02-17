const useAllowedMIMEDocType = () => {
  return {
    MIMEtype: [
      //for image
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      //for Pdf
      "application/pdf",
      //for Word file
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/doc",
      //for Zip
      "application/zip",
      "application/x-zip",
      "application/octet-stream",
      "application/x-zip-compressed",
      //for csv
      "text/csv",
      "text/comma-separated-values",
      "application/csv",
      "application/excel",
      "application/vnd.ms-excel",
      "application/vnd.msexcel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      //for rar
      "application/x-rar",
      "application/vnd.rar",
      "application/x-rar-compressed",
    ],
  };
};

export { useAllowedMIMEDocType };
