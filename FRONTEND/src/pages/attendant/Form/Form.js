import React,  { useState, useEffect }  from 'react';
import axios from 'axios';
import api from '../../api/index';
import RenderForm from '../RenderForm/renderForm.js';
import { useParams } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState(null);
  const [formInfo,setFormInfo] = useState(null)
  const { id } = useParams();
  const [business,setBusiness] = useState('');
  const [formDescription,setFormDescription] = useState('');
  useEffect(() => {
    // Replace with the actual URL of your API endpoint
    const apiUrl = api+'api/businesses/form/'+id; // Replace with your API URL
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data.statusCode === 200 && data.data) {
          console.log(data);
          const formJson = JSON.parse(data.data.formJson);
          data.data.businessName && setBusiness(data.data.businessName);
          data.data.formDescription && setFormDescription(data.data.formDescription);
          setFormData(formJson);
        }
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, []);
  console.log(formData);
  return (<div>
          {formData?<div>
            <h1>{business}</h1>
            <h2>{formDescription}</h2>
            <RenderForm fields={formData} /></div>:<div>Loading...</div>}
        </div>
  );
};

export default Form;
