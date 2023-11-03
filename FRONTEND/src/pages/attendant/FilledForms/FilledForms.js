import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import api from '../../api/index';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DataTable from './DataTable';

const FilledForms = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(api+'api/attendants/forms/list')
      .then(response => {
        if (response.data.statusCode === 200) {
          setFormData(response.data.data.data);
          console.log('data Recieved',response.data.data.data); 
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
return (
    <div className="VRbody">
      <h3>Filled Forms</h3>
      {loading ? (
        <p>Loading...</p>
      ) : ( formData.length>0 &&
        <DataTable completeData={formData} />

      )}
    </div>
  );
}

export default FilledForms;
