import React, { useState,useEffect } from 'react';
import "./RenderForm.css"
import axios from 'axios';
import api from '../../api/index';

function RenderForm({ fields, initialValues  }) {
  const [formData, setFormData] = useState(initialValues || {});

  useEffect(() => {
    if (initialValues) {
      // console.log('rendering initial values',initialValues);
      // console.log(formData);
      setFormData(initialValues);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderFields = () => {
    return fields.map((field) => {
      const {
        fieldName,
        fieldType,
        fieldLabel,
        minLength,
        maxLength,
        regex,
        required,
        values,
      } = field;

      switch (fieldType) {
        case 'text':
          return (
            <div className="fields" key={fieldName}>
              <label htmlFor={fieldName}>{fieldLabel}:</label>
              <br />
              <input 
                className="field"
                type="text"
                id={fieldName}
                name={fieldName}
                value={formData[fieldName.toLowerCase()] || ''}
                onChange={handleChange}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                pattern={regex?regex:undefined}
              />
            </div>
          );

        case 'radio':
          return (
            <div className="fields" style={{display: "flex", alignItems: 'center'}} key={fieldName}>
              <p>{fieldLabel}: </p>
              {values.map((option) => (
                <label key={option}>
                  <input 
                    // className="field"
                    type="radio"
                    name={fieldName}
                    value={formData[fieldName.toLowerCase()] || option}
                    defaultValue={formData[fieldName.toLowerCase()]}
                    onChange={handleChange}
                    required={required}
                  />
                  {option}
                </label>
              ))}
            </div>
          );

        case 'date':
          return (
            <div className="fields" key={fieldName}>
              <label htmlFor={fieldName}>{fieldLabel}:</label>
                <br />
                <input 
                className="field"
                type="date"
                id={fieldName}
                name={fieldName}
                value={formData[fieldName.toLowerCase()] || ''}
                onChange={handleChange}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                pattern={regex}
              />
            </div>
          );
          case 'dropdown':
            return (
              <div className="fields" key={fieldName}>
                <label htmlFor={fieldName}>{fieldLabel}:</label>
                <br />
                <select
                  className="field"
                  id={fieldName}
                  name={fieldName}
                  value={formData[fieldName.toLowerCase()] || ''}
                  onChange={handleChange}
                  required={required}
                >
                  <option value="">Select {fieldLabel}</option>
                  {values.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );

        default:
          return null;
      }
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const localdata = JSON.parse(localStorage.getItem('userdata'));
      const sendData = {
        businessId : localdata.businessId,
        attendantName : localdata.userName,
        attendantId : localdata.userId,
        formDataJson : JSON.stringify(formData)
      }
      console.log('sending Data',sendData);
      const response = await axios.put(api+'api/attendants/formData/'+localdata.userId , sendData);
      alert('Form Saved!');
      window.location.reload();
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error while submitting the form:', error);
      alert('Error while saving the form.');
    }
  };

  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
        {renderFields()}
        <div style={{display: 'grid'}}><button className='blueButton' type="submit">Submit</button></div>
        
        </form>
    </div>
  );
}

export default RenderForm;
