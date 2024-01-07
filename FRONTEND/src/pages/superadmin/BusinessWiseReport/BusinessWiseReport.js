import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api';
import './BusinessWiseReport.css'
const BusinessWiseReport = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const baseURL = api + "api/businesses?page=0&limit=100";
  const [formCount, setFormCount] = useState(null); // Added formCount state

  useEffect(() => {
    // Fetch businesses data
    axios.get(baseURL)
      .then(response => {
        const data = response.data;
        console.log('res.data',data);
        if (data.statusCode === 200) {
          console.log('business',data.data.data.map(business => ({
            id: business.businessId,
            name: business.businessName
          })));
          setBusinesses(data.data.data.map(business => ({
            id: business.businessId,
            name: business.businessName
          })));
        } else {
          console.error('Error fetching businesses:', data.message);
        }
      })
      .catch(error => console.error('Error fetching businesses:', error));
  }, []);

  const handleSubmit = () => {
    // Make API call with selected business ID, from, and to date
    if (new Date(toDate) < new Date(fromDate)) {
      window.alert("To Date cannot be before From Date");
      return;
    }
    const apiUrl = api+`api/admin/formCounts`;
    const requestBody = {
      from: fromDate,
      to: toDate
    };
    const formattedFromDate = new Date(fromDate).toUTCString();
    const formattedToDate = new Date(toDate).toUTCString();
    console.log('post url',`${apiUrl}/${selectedBusiness}?fromDate=${formattedFromDate}?toDate=${formattedToDate}`);
    axios.get(`${apiUrl}/${selectedBusiness}?fromDate=${encodeURIComponent(formattedFromDate)}?toDate=${encodeURIComponent(formattedToDate)}`, requestBody)
      .then(response => {
        // Handle response as needed
        console.log('Form submission response:', response.data);
        
        if (response.data.statusCode === 200) {
          setFormCount(response.data.data.formCount);
        } else {
          console.error('Error in form submission response:', response.data.message);
        }
      })
      .catch(error => console.error('Error submitting form:', error));
  };

  return (
    <div className='business-wise-report'>
      {/* <h2>BusinessWiseReport</h2> */}
      <form>
        <label>
          Business Name: <br></br>
          <select value={selectedBusiness} onChange={(e) => setSelectedBusiness(e.target.value)}>
            <option value="" disabled>Select a business</option>
            {businesses.map(business => (
              <option key={business.id} value={business.id}>{business.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          From Date:<br></br>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </label>
        <br />
        <label>
          To Date:<br></br>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
              {/* Display form count if available */}
              {formCount !== null && (
          <div style={{marginTop: 20}}>
            <p>Total number of forms Generated: {formCount}</p>
          </div>
        )}
    </div>
  );
};

export default BusinessWiseReport;
