const useAllowedMIMEDocType = () => {
  return {
    MIMEtype: [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/zip",
      "application/x-zip",
      "application/octet-stream",
      "application/x-zip-compressed",
      "text/csv",
    ],
  };
};

export { useAllowedMIMEDocType };
