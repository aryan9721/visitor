import React, { useState } from 'react';
import axios from 'axios';
import api from '../../api'
import './SendLink.css'
const SendLink = () => {
  // Step 2: Create state variable to store the mobile number
  const [mobileNumber, setMobileNumber] = useState('');
  const [response, setResponse] = useState(null); // To store API response
  const localdata = JSON.parse(localStorage.getItem('userdata'));

  // Step 3: Create a function to handle form submission and make the API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can replace 'YOUR_API_URL' with the actual API endpoint you want to call
    const apiUrl = api+'';

    try {
      const response = await axios.post(apiUrl, { mobileNumber, businessId: localdata.businessId });

      // Check if the request was successful (status code 2xx)
      if (response.status === 200) {
        // Update the state with the API response data
        setResponse(response.data);
      } else {
        console.error('API call failed, under Development!');
      }
    } catch (error) {
      alert('Error making API call: under Development!');
    }
  };

  return (
    <div className="center-box">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <label>
            Mobile Number:
            <input
              className='field'
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </label>
          <br />
          <button className="blueButton" type="submit">
            Submit
          </button>
        </form>
      </div>

      {response && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SendLink;
