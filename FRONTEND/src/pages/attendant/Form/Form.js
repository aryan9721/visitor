import React,  { useState, useEffect }  from 'react';
import axios from 'axios';
import api from '../../api/index';
import RenderForm from '../RenderForm/renderForm.js';
import { useParams } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState(null);
  const [formInfo,setFormInfo] = useState(null)
  const { id } = useParams();

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
          setFormData(formJson);
        }
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, []);
  console.log(formData);
  return (<div>
          {formData?<div><RenderForm fields={formData} /></div>:<div>Loading...</div>}
        </div>
  );
};

export default Form;
