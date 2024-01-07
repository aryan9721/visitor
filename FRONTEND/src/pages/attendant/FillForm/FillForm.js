import React,  { useState, useEffect }  from 'react';
import axios from 'axios';
import api from '../../api/index';
import RenderForm from '../RenderForm/renderForm.js';
const FillForm = () => {
  const localdata = JSON.parse(localStorage.getItem('userdata'));
  const [formData, setFormData] = useState(null);
  const [formInfo,setFormInfo] = useState(null)
  const [businessName,setBusinessName] = useState('');
  const [formDescription,setFormDescription] = useState('');
  useEffect(() => {
    // Replace with the actual URL of your API endpoint
    const apiUrl = api+'api/businesses/form/'+localdata.businessId; // Replace with your API URL
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data.statusCode === 200 && data.data) {
          console.log(data);
          const formJson = JSON.parse(data.data.formJson);
          setBusinessName(data.data.businessName);
          setFormDescription(data.data.formDescription);
          setFormData(formJson);
        }
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, []);
  console.log(formData);
  return (<div>
          {businessName?<h1>{businessName}</h1>:''}
          {formDescription?<h2>{formDescription}</h2>:''}
          {formData?<div><RenderForm fields={formData} /></div>:<div>Loading...</div>}
        </div>
  );
};

export default FillForm;
