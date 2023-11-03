import React from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import api from '../../api/index';
const DataTable = ({ completeData }) => {
    const parsedFormDataArray = [];

    // Loop through each object in completeData and parse formDataJson
    for (const item of completeData) {
    let parsedFormData = JSON.parse(item.formDataJson);
    parsedFormData.formId = item.formId
    parsedFormDataArray.push(parsedFormData);
    }
    console.log('comp',parsedFormDataArray);
    const data = parsedFormDataArray
    console.log('data',data);
  // Extract the keys from the first object in the data array to use as column headers
  const columns = Object.keys(data[0]);
  const handleDeleteRow = (formId) => {
    console.log(formId);
    const localdata = JSON.parse(localStorage.getItem('userdata'));
    const attendantId = localdata.userId
    // Make your API call using Axios
    axios
      .delete(`${api}api/attendants/formData/${attendantId}/${formId}`)
      .then((response) => {
        if (response.status === 200) {
            console.log(response);
            alert(response.data.message);
            window.location.reload();
          // Row was successfully deleted, you can update your data or perform any other action
        } else {
          // Handle error
          console.error('Error deleting row');
        }
      })
      .catch((error) => {
        // Handle network error or other errors
        console.error('Error:', error);
      });
  };
  // Convert the data into the format expected by MDBDataTable
  const formattedData = {
    columns: [
        ...columns.map((column) => ({
          label: column.toUpperCase(),
          field: column.toLowerCase(),
        })),
        // Add an "Action" column with a button
        {
          label: 'ACTION',
          field: 'action',
          sort: 'disabled',
        },
      ],
    rows: data.map((item, rowIndex) => ({
      ...item,
      // Add a unique key for each row
    //   clickEvent: () => alert(`Clicked row ${rowIndex}`), // Example: Add a click event for each row
    action: (
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteRow(item.formId)} // Assuming there's an 'id' property in your data
        >
          Delete
        </button>
      ),
    })),
  };

  return <MDBDataTable noBottomColumns style={{lineHeight: "normal",whiteSpace: "pre", justifyContent: "center"}} striped bordered small data={formattedData} />;
};

export default DataTable;
