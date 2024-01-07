import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./CreateForm.css"
import axios from "axios";
import api from '../../api/index';

const FieldsDisplay = ({ fields, onRemoveField,ontoggleRequired }) => {
  
  return (
    <div>
      {fields.map((field, index) => (
        <div key={index} style={{border: "1px solid black", margin: 10, padding: 20, borderRadius: 5}}>
        <button className='blueButton' onClick={() => onRemoveField(index)} style={{ float: 'right', cursor: 'pointer', backgroundColor:'red' }}>Delete</button>
        <strong>Field Number: {index+1} </strong> <br />
        <strong>Field Label: {field.fieldLabel}: </strong> <br />
        <span>Field Name: {field.fieldName}</span><br />
        <span>Field Type: {field.fieldType}</span><br />
        <span>Minimum Length: {field.minLength}</span><br />
        <span>Maximum Length: {field.maxLength}</span><br />
        {/* <span>Regex: {field.regex}</span><br /> */}
        <span style={{marginRight: 10}}>Required:</span>
        {
          field.required?
          <button className='blueButton' onClick={() => ontoggleRequired(index)} style={{padding: '3px 7px',fontWeight: 'normal', marginLeft: 0, backgroundColor: 'limegreen' }}>Yes</button>
          :
          <button className='blueButton' onClick={() => ontoggleRequired(index)} style={{ padding: '3px 7px',fontWeight: 'normal',marginLeft: 0, backgroundColor: 'red'   }}>No</button>
          }
        {/* <span>Values: {field.values.join(', ')}</span><br /> */}
      </div>  
      ))}
    </div>
  );
};

const CreateForm = () => {
  const [business,setBusiness] = useState('');
  const [formDescription,setFormDescription] = useState('');
  const handleBusinessChange = (event) => {
    setBusiness(event.target.value);
  };

  const handleFormDescriptionChange = (event) => {
    setFormDescription(event.target.value);
  };
  const [fields, setFields] = useState(
    [
      {
        "fieldName": "fullName",
        "fieldType": "text",
        "fieldLabel": "Full Name",
        "minLength": 1,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "businessName",
        "fieldType": "text",
        "fieldLabel": "Business Name",
        "minLength": 0,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "mobile",
        "fieldType": "text",
        "fieldLabel": "Mobile",
        "minLength": 10,
        "maxLength": 10,
        "regex": "^[0-9]*$",
        "required": true,
        "values": []
      },
      {
        "fieldName": "email",
        "fieldType": "text",
        "fieldLabel": "Email",
        "minLength": 1,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "gender",
        "fieldType": "radio",
        "fieldLabel": "Gender",
        "minLength": 1,
        "maxLength": 1,
        "regex": "",
        "required": true,
        "values": ["M", "F"]
      },
      {
        "fieldName": "father",
        "fieldType": "text",
        "fieldLabel": "Father",
        "minLength": 0,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "spouse",
        "fieldType": "text",
        "fieldLabel": "Spouse",
        "minLength": 0,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "address1",
        "fieldType": "text",
        "fieldLabel": "Address Line 1",
        "minLength": 1,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "address2",
        "fieldType": "text",
        "fieldLabel": "Address Line 2",
        "minLength": 0,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "city",
        "fieldType": "text",
        "fieldLabel": "City",
        "minLength": 1,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "pincode",
        "fieldType": "text",
        "fieldLabel": "Pincode",
        "minLength": 6,
        "maxLength": 6,
        "regex": "^[0-9]*$",
        "required": true,
        "values": []
      },
      {
        "fieldName": "state",
        "fieldType": "text",
        "fieldLabel": "State",
        "minLength": 1,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "pan",
        "fieldType": "text",
        "fieldLabel": "PAN",
        "minLength": 1,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "aadhaarCard",
        "fieldType": "text",
        "fieldLabel": "Aadhaar Card",
        "minLength": 12,
        "maxLength": 12,
        "regex": "^[0-9]*$",
        "required": true,
        "values": []
      },
      {
        "fieldName": "dob",
        "fieldType": "date",
        "fieldLabel": "Date of Birth",
        "minLength": 10,
        "maxLength": 10,
        "regex": "^\\d{2}/\\d{2}/\\d{4}$",
        "required": true,
        "values": []
      },
      {
        "fieldName": "ageInYear",
        "fieldType": "text",
        "fieldLabel": "Age in Years",
        "minLength": 1,
        "maxLength": 3,
        "regex": "^[0-9]*$",
        "required": true,
        "values": []
      },
      {
        "fieldName": "vehicle",
        "fieldType": "text",
        "fieldLabel": "Vehicle",
        "minLength": 0,
        "maxLength": 255,
        "regex": "",
        "required": true,
        "values": []
      },
      {
        "fieldName": "bloodGroup",
        "fieldType": "text",
        "fieldLabel": "Blood Group",
        "minLength": 1,
        "maxLength": 5,
        "regex": "",
        "required": true,
        "values": []
      }
    ]
  );
  const [isSaving, setIsSaving] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newField, setNewField] = useState({
    fieldName: '',
    fieldType: 'text',
    fieldLabel: '',
    minLength: '',
    maxLength: '',
    regex: '',
    required: false,
    values: [],
  });
  function convertFieldNamesToLowerCase(inputArray) {
    console.log('ip',inputArray);
    // Iterate through each object in the array
    for (let i = 0; i < inputArray.length; i++) {
        // Check if the object has a "fieldName" property
        if (inputArray[i].hasOwnProperty("fieldName")) {
            // Convert the "fieldName" to lowercase
            inputArray[i].fieldName = inputArray[i].fieldName.toLowerCase();
        }
    }
    return inputArray
}
  const openModal = () => {
    setModalIsOpen(true);
  };

  const saveFieldsToBackend = async () => {
    setIsSaving(true);
    try {
      // Make an API call to send the 'fields' object to the backend.
      const localdata = JSON.parse(localStorage.getItem('userdata'));
      console.log(localdata);
      setFields(convertFieldNamesToLowerCase(fields));
      console.log(fields);
      console.log( { businessId: localdata.businessId,businessName:business, formDescription: formDescription,"formJson": JSON.stringify(fields) });
      const response = await axios.put(api+'api/businesses/form',{ businessId: localdata.businessId,businessName:business, formDescription: formDescription,"formJson": JSON.stringify(fields) });
      alert('Form saved');
      // Handle the response as needed. You can show a success message or perform other actions.
      console.log('API Response:', response.data);
    } catch (error) {
      // Handle any errors from the API call.
      console.error('Error:', error);
    }
    setIsSaving(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setNewField((prevNewField) => ({
      ...prevNewField,
      [name]: value,
      // [`${name}_required`]: !prevNewField[`${name}_required`], // Toggle the required property
    }));
  };

  const toggle = () => {
    setNewField(prevState => ({
      ...prevState,
      required: !prevState.required,
    }));
  };

  const handleNewInputChange = (event) => {
    const { name, value } = event.target;
  
    // If the field is 'values', split the comma-separated string into an array
    const updatedValue = name === 'values' ? value.split(',').map(val => val.trim()) : value;
  
    setNewField(prevState => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };
  

  const addNewField = () => {
    console.log(newField);
    if (
      
      newField.fieldName.trim() === '' ||
      newField.fieldType.trim() === '' ||
      newField.fieldLabel.trim() === ''
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    if(isNaN(newField.minLength) || isNaN(newField.maxLength))
    {
      alert("Number required in Min/Max length")
    }
    setFields((prevFields) => [...prevFields, newField]);
    closeModal();
  };

  const handleRemoveField = (indexToRemove) => {
    setFields((prevFields) => prevFields.filter((_, index) => index !== indexToRemove));
  };

  const toggleRequired = (indexToToggle) => {
  setFields((prevFields) =>
    prevFields.map((field, index) =>
      index === indexToToggle ? { ...field, required: !field.required } : field
    )
  );

  
  
};
  return (
    <div>
      <button className='blueButton' onClick={openModal}>Add New Field</button>
      <button className='blueButton' onClick={saveFieldsToBackend} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save'}
      </button>

      <div style={{display: 'flex'}}>
        <Modal style={{display: 'flex'}} open={modalIsOpen} onClose={closeModal}>
          <Box sx={{ width: 400, margin: 'auto',bgcolor: 'background.paper', p: 3 }}>
            <h2>Add New Field</h2>
            <form>
              {/* <TextField
              required
                className='newInput'
                label="Field Type"
                name="fieldType"
                onChange={handleInputChange}
                value={newField.fieldType}
                fullWidth
              /> */}
              <label style={{marginRight: 10,marginLeft: 10,marginBottom: 10}} htmlFor="fieldType">Field Type:</label>
              <select id="fieldType" name="fieldType" value={newField.fieldType} onChange={handleInputChange}>
                <option value="text">Text</option>
                <option value="radio">Radio</option>
                <option value="dropdown">Dropdown</option>
                <option value="date">Date</option>
              </select>

              <TextField
              required
                className='newInput'
                label="Field Label"
                name="fieldLabel"
                onChange={handleInputChange}
                value={newField.fieldLabel}
                fullWidth
              />
                            <TextField
                required
                className='newInput'
                label="Field Name (useCamelCase) "
                name="fieldName"
                onChange={handleInputChange}
                value={newField.fieldName}
                fullWidth
              />
              <TextField
                className='newInput'
                label="Minimum Length"
                name="minLength"
                onChange={handleInputChange}
                value={newField.minLength}
                fullWidth
              />
              <TextField
                className='newInput'
                label="Maximum Length"
                name="maxLength"
                onChange={handleInputChange}
                value={newField.maxLength}
                fullWidth
              />
              {/* <TextField
                className='newInput'
                label="Regex"
                name="regex"
                onChange={handleInputChange}
                value={newField.regex}
                fullWidth
              /> */}
              <div style={{padding: '10.5px 14px 10.5px 12px'}}>
                <label>
                  Required:
                  <input type="checkbox" name="required" onChange={toggle} />
                </label>
              </div>
              {
  newField.fieldType === 'radio' ?
    <TextField
      className='newInput'
      label="Values for Radio (comma-separated)"
      name="values"
      onChange={handleNewInputChange}
      value={Array.isArray(newField.values) ? newField.values.join(', ') : ''}
      fullWidth
    />
    :
    <></>
}
{
  newField.fieldType === 'dropdown' ?
    <TextField
      className='newInput'
      label="Values for Dropdown (comma-separated)"
      name="values"
      onChange={handleNewInputChange}
      value={Array.isArray(newField.values) ? newField.values.join(', ') : ''}
      fullWidth
    />
    :
    <></>
}


              <Button className='newInput' variant="contained" onClick={addNewField}>Add Field</Button>
              <Button variant="contained" className='newInput' onClick={closeModal}>Cancel</Button>
            </form>
          </Box>
        </Modal>
      </div>
      <div>
      <TextField
        label="Business Name"
        variant="outlined"
        value={business}
        onChange={handleBusinessChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Form Description"
        variant="outlined"
        value={formDescription}
        onChange={handleFormDescriptionChange}
        fullWidth
        margin="normal"
      />
    </div>
      <FieldsDisplay fields={fields} onRemoveField={handleRemoveField} ontoggleRequired={toggleRequired} />
    </div>
  );
};

export default CreateForm;
