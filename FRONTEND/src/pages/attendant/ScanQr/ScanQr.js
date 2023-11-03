import React, { useState,useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import RenderForm from '../RenderForm/renderForm';
import axios from 'axios';
import api from '../../api/index';
const ScanQr = () => {
  const [result, setResult] = useState('');
  const [isScanning,setIsScanning] = useState(true);

  const handleScan = (data) => {
    if (result==='' && data) {
      setResult(createJsonObject(JSON.parse(data.text)));
      // console.log('Read: ',createJsonObject(JSON.parse(data.text))); // Log the scanned data
      setIsScanning(false);
    }
  };
  function convertDateFormat(inputDate) {
    // Split the input date string into day, month, and year
    const parts = inputDate.split('/');
    
    // Check if the input format is correct (dd/MM/yyyy)
    if (parts.length !== 3) {
      return 'Invalid input format';
    }
    
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    
    // Create a new Date object in the desired format (yyyy-MM-dd)
    const newDate = new Date(`${year}-${month}-${day}`);
    
    // Check if the new Date object is valid
    if (isNaN(newDate.getTime())) {
      return 'Invalid date';
    }
    
    // Extract the date in the "yyyy-MM-dd" format
    const formattedDate = newDate.toISOString().split('T')[0];
    
    return formattedDate;
  }
  const handleError = (error) => {
    console.error(error);
  };
  function createJsonObject(data) {
    const jsonObject = {};

    for (const item of data) {
        const [key, value] = item.split(' : ');
        jsonObject[key.trim().toLowerCase()] = value.trim();
    }
    if(jsonObject.dob)
    {
      jsonObject.dob = convertDateFormat(jsonObject.dob);
    }
    // console.log('initial',jsonObject);
    return jsonObject;
}
  const localdata = JSON.parse(localStorage.getItem('userdata'));
  const [formData, setFormData] = useState(null);

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
          setFormData(formJson);
        }
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, []);

  return (
    <div>
      {
        isScanning?<QrReader
        delay={300}
        onError={handleError}
        onResult={handleScan}
        style={{ width: '100%' }}
        constraints={{facingMode: 'environment'}}
      />:<RenderForm fields={formData} initialValues={result}/>
      }
      
      {/* <p>Scanned Data: {result}</p> */}
    </div>
  );
};

export default ScanQr;
