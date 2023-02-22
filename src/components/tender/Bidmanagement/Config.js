import fileDefault from '../assets/file-blank-solid-240.png';
import fileCSS from '../assets/file-css-solid-240.png';
import filePdf from '../assets/file-pdf-solid-240.png';
import filePng from '../assets/file-png-solid-240.png';
import fileDoc from '../assets/file-doc-solid-240.png';
import fileZip from '../assets/icons8-zip-64.png';
import fileRaR from '../assets/icons8-open-archive-64.png';
import fileCSV from '../assets/icons8-csv-64.png';
import fileExcel from '../assets/icons8-xls-64.png';
 
export const ImageConfig = {
    default: fileDefault,
    pdf: filePdf,
    png: filePng,
    css: fileCSS,
    doc: fileDoc,
    'msword' : fileDoc,
    'vnd.openxmlformats-officedocument.wordprocessingml.document' : fileDoc,
    
    'x-zip-compressed' : fileZip,
    'zip' : fileZip,

    'x-rar' : fileRaR,
    'vnd.rar' : fileRaR,
    'x-rar-compressed' : fileRaR,
    'octet-stream' : fileRaR,

    'csv' : fileCSV,

    'vnd.ms-excel' : fileExcel,
    'vnd.openxmlformats-officedocument.spreadsheetml.sheet' : fileExcel
}