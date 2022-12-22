import { Fragment } from "react";
import { useEffect, useState } from "react";
import './CustomerCreationList.css'
//For DataTable
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-bs4";
import jsZip from "jszip";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import axios from "axios";
import { useBaseUrl } from "../../hooks/useBaseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

let table ;



const CustomerCreationList = ()  =>{
  const { server1: baseUrl } = useBaseUrl();
  const navigate = useNavigate()
  const location = useLocation();
const [customerList, setCustomerlist] = useState([])

  useEffect(() => {
    table =  $('#dataTable').DataTable({
        data : customerList,
        columns: [
            { data: 'sl_no' },
            { data: 'customer_name' },
            { data: 'state_name' },
            { data: 'city_name' },
            { data: 'customer_group' },
            { data: 'buttons' },
        ],
    })

    $('#dataTable tbody').on('click', 'tr .fa-edit', function () {
      let rowdata =table.row($(this).closest('tr')).data();
      navigate(`${location.pathname}/main/profile/${rowdata.id}`)
      // props.onEdit(rowdata)
    });

    $('#dataTable tbody').on('click', 'tr .fa-trash-o', function () {
      let rowdata = table.row($(this).closest('tr')).data();
     
      deleteList(rowdata.id)
      // props.onDelete(rowdata)
    });
  }, [])


  const deleteList = async (id) => {
    let response =  await axios.delete(`${baseUrl}/api/customercreationprofile/${id}`);
    if(response.data.status === 200){
      getlist()
      toast.success( response.data.message , {
        position: toast.POSITION.TOP_CENTER
      });
    }else{
      toast.error("Unable to Delete!" , {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  const getlist = async () => {
    let response =  await axios.get(`${baseUrl}/api/customercreationprofile`);

    let list = [...response.data.customercreationList];
       let listarr = list.map((item, index, arr)=> ({
         ...item,
         customer_group : item.smart_city === "yes" ? "Smart City" : "Non Smart City",
         buttons:`<i class="fas fa-edit text-success mx-2 h6" style="cursor:pointer" title="Edit"></i> <i class="fa fa-trash-o  text-danger h6  mx-2" style="cursor:pointer; font-size: 1.25rem"  title="Delete"></i>`,
         sl_no : index+1
       }))
        table.clear().rows.add(listarr).draw();
  }

  useEffect(() => {

    getlist()

  }, [])
    

 return (
    <Fragment>
       <ToastContainer />
        <div className="table-responsive pb-3">
        <table
          className="table text-center"
          id="dataTable"
          width="100%"
          cellSpacing={0}
        >
          <thead className="text-center bg-gray-200 text-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer Name</th>
              <th scope="col">State Name</th>
              <th scope="col">City Name</th>
              <th scope="col">Customer Group</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
                
          </tbody>
        </table>
      </div>
    </Fragment>
 );
}


export default CustomerCreationList