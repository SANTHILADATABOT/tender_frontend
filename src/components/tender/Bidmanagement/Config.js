import fileDefault from '../assets/file-blank-solid-240.png';
// import fileCSS from '../assets/file-css-solid-240.png';
// import filePdf from '../assets/file-pdf-solid-240.png';
import filePdf from '../assets/new/pdf.png';
import filePng from '../assets/file-png-solid-240.png';
import fileDoc from '../assets/file-doc-solid-240.png';
// import fileZip from '../assets/Simple_Comic_zip.png';
import fileZip from '../assets/new/zip.png';
import fileCsv from '../assets/csv.png';

export const ImageConfig = {
    default: fileDefault,
    pdf: filePdf,
    png: filePng,
    // css: fileCSS,
    doc: fileDoc,
    'msword' : fileDoc,
    'vnd.openxmlformats-officedocument.wordprocessingml.document' : fileDoc,
    'x-zip-compressed' : fileZip,
    'vnd.rar' : fileZip,
    'x-rar-compressed': fileZip,
    'octet-stream' : fileZip,
    'zip' : fileZip,
    'x-zip-compressed' : fileZip,
    'multipart/x-zip' : fileZip,
    csv : fileCsv, // text/csv
}