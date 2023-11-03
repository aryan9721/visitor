import "./EditBusiness.css";
import React, { useState,useEffect } from "react";
import axios from "axios";
import api from '../../api';
import {
  Alert,
} from '@mui/material';
const EditBusiness = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState('');

  const [resultData, setresultData] = useState("");
  const [businessName, setbusinessName] = useState("");
  const handlebusinessName = (event) => {
    const businessName = event.target.value;
    setbusinessName(businessName);
  };
  const [firstName, setfirstName] = useState("");
  const handlefirstName = (event) => {
    const firstName = event.target.value;
    setfirstName(firstName);
  };
  const [lastName, setlastName] = useState("");
  const handlelastName = (event) => {
    const lastName = event.target.value;
    setlastName(lastName);
  };
  const [middleName, setmiddleName] = useState("");
  const handlemiddleName = (event) => {
    const middleName = event.target.value;
    setmiddleName(middleName);
  };
  const [businessContactNo, setbusinessContactNo] = useState("");
  const handlebusinessContactNo = (event) => {
    const businessContactNo = event.target.value;
    setbusinessContactNo(businessContactNo);
  };
  const [personalContactNo, setpersonalContactNo] = useState("");
  const handlepersonalContactNo = (event) => {
    const personalContactNo = event.target.value;
    setpersonalContactNo(personalContactNo);
  };

  const [businessAddress, setbusinessAddress] = useState("");
  const handlebusinessAddress = (event) => {
    const businessAddress = event.target.value;
    setbusinessAddress(businessAddress);
  };
  const [personalAddress, setpersonalAddress] = useState("");
  const handlepersonalAddress = (event) => {
    const personalAddress = event.target.value;
    setpersonalAddress(personalAddress);
  };
  const [businessPincode, setbusinessPincode] = useState("");
  const handlebusinessPincode = (event) => {
    const businessPincode = event.target.value;
    setbusinessPincode(businessPincode);
  };
  const [personalPincode, setpersonalPincode] = useState("");
  const handlepersonalPincode = (event) => {
    const personalPincode = event.target.value;
    setpersonalPincode(personalPincode);
  };
  const [businessEmailId, setbusinessEmailId] = useState("");
  const handlebusinessEmailId = (event) => {
    const businessEmailId = event.target.value;
    setbusinessEmailId(businessEmailId);
  };
  const [personalEmailId, setpersonalEmailId] = useState("");
  const handlepersonalEmailId = (event) => {
    const personalEmailId = event.target.value;
    setpersonalEmailId(personalEmailId);
  };
  const [gstNo, setgstNo] = useState("");
  const handlegstNo = (event) => {
    const gstNo = event.target.value;
    setgstNo(gstNo);
  };
  const [pancardNo, setpancardNo] = useState("");
  const handlepancardNo = (event) => {
    const pancardNo = event.target.value;
    setpancardNo(pancardNo);
  };
  const submitUser = async (e) => {
    e.preventDefault();
    const userdata = {
      firstName: firstName,
      businessName: businessName,
      middleName: middleName,
      lastName: lastName,
      businessContactNo: businessContactNo,
      personalContactNo: personalContactNo,
      businessAddress: businessAddress,
      personalAddress: personalAddress,
      businessPincode: businessPincode,
      personalPincode: personalPincode,
      businessEmailId: businessEmailId,
      personalEmailId: personalEmailId,
      gstNo: gstNo,
      pancardNo: pancardNo,
    };
    // console.log("sending data: ", userdata);
    await axios
      .put(
        api+ "api/businesses/"+userdata1.userId,
        userdata
      )
      .then((result) => {
        // console.log(result.data);
        setresultData(result.data);
        setMessage(result.data.message + ' Please contact admin at 8600995189.');

      });
  };
  // const [businessData,setBusinessData] = useState(null);

  const userdata1 = JSON.parse(localStorage.getItem('userdata'));
  const baseURL =
  api+ "api/businesses/"+userdata1.userId;
  const [results, setresults] = useState(null);

  useEffect(() => {
    getresults();
  }, []);
  
  //get todo list from database
  const getresults = () => {
    axios.get(baseURL).then((response) => {
      // console.log(response.data.data);
      setbusinessName(response.data.data.businessName);
      setfirstName(response.data.data.firstName);
      setlastName(response.data.data.lastName);
      setmiddleName(response.data.data.middleName);
      setbusinessContactNo(response.data.data.businessContactNo);
      setpersonalContactNo(response.data.data.personalContactNo);
      setbusinessAddress(response.data.data.businessAddress);
      setpersonalAddress(response.data.data.personalAddress);
      setbusinessPincode(response.data.data.businessPincode);
      setpersonalPincode(response.data.data.personalPincode);
      setbusinessEmailId(response.data.data.businessEmailId);
      setpersonalEmailId(response.data.data.personalEmailId);
      setgstNo(response.data.data.gstNo);
      setpancardNo(response.data.data.pancardNo);
      setresults(response.data.data);
    });
  };
  console.log(results);
  return (
    <div>
    {
      results ? (    <div className="home">
      <div className="homeContainer">
        <div className="body">
          <div className="formContainer">
            
            <h3>Edit your Business</h3>

            <form onSubmit={submitUser} >
            {message!=='' && <Alert severity="success">{message}</Alert>}
            <div onChange={(e) => handlebusinessName(e)}style={{ width: "100%" }} className="formInput">
                <label>Business Name*</label>
                <input required type={Text} placeholder={"ABC Services"} value={businessName} />
              </div>
              <div className="nameblock">
              <div onChange={(e) => handlefirstName(e)}style={{ width: "30%" }} className="formInput">
                <label>First Name*</label>
                <input required type={Text} placeholder={"Aryan"} value={firstName}/>
              </div>
              <div onChange={(e) => handlemiddleName(e)}style={{ width: "30%" }} className="formInput">
                <label>Middle Name*</label>
                <input required type={Text} placeholder={"Mahendra"} value={middleName}/>
              </div>
              <div onChange={(e) => handlelastName(e)} style={{ width: "30%" }} className="formInput">
                <label>Last Name*</label>
                <input required type={Text} placeholder={"Vora"} value={lastName}/>
              </div>

              </div>
              {/* <div onChange={(e) => handlebusinessContactNo(e)} className="formInput">
                <label>Business Contact No*</label>
                <input
                  style={{
                    padding: "8px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "auto",
                  }}
                  type="number"
                  value={businessContactNo}
                  placeholder={"+91 1234567890"}
                />
              </div>

              <div onChange={(e) => handlepersonalContactNo(e)} className="formInput">
                <label>Personal Contact No*</label>
                <input
                  style={{
                    padding: "8px",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    height: "auto",
                  }}
                  type="number"
                  value={personalContactNo}
                  placeholder={"+91 1234567890"}
                />
                              </div> */}

                <div onChange={(e) => handlebusinessAddress(e)} style={{ width: "100%" }} className="formInput">
                <label>Business Address*</label>
                <input required type={Text} placeholder={"Tilak road, Pune"} value={businessAddress}/>
              </div>
              <div onChange={(e) => handlepersonalAddress(e)} style={{ width: "100%" }} className="formInput">
                <label>Personal Address*</label>
                <input required type={Text} placeholder={"411001"} value={personalAddress}/>
              </div>
              <div onChange={(e) => handlebusinessPincode(e)} style={{ width: "100%" }} className="formInput">
                <label>Business Pincode*</label>
                <input required type="number" placeholder={"Tilak road, Pune"} value={businessPincode}/>
              </div>
              <div onChange={(e) => handlepersonalPincode(e)} style={{ width: "100%" }} className="formInput">
                <label>Personal Pincode*</label>
                <input required type="number" placeholder={"411001"}value={personalPincode} />
              </div>              <div onChange={(e) => handlebusinessEmailId(e)} style={{ width: "100%" }} className="formInput">
                <label>Business EmailId*</label>
                <input required type="email" placeholder={"example@gmail.com"} value={businessEmailId}/>
              </div>
              <div onChange={(e) => handlepersonalEmailId(e)} style={{ width: "100%" }} className="formInput">
                <label>Personal EmailId*</label>
                <input required type="email" placeholder={"example@gmail.com"} value={personalEmailId}/>
              </div>              <div onChange={(e) => handlegstNo(e)} style={{ width: "100%" }} className="formInput">
                <label>GST Registration Number*</label>
                <input required type={Text} placeholder={"GST123456789"} value={gstNo}/>
              </div><div onChange={(e) => handlepancardNo(e)} style={{ width: "100%" }} className="formInput">
                <label>Pan Card Number*</label>
                <input required type={Text} placeholder={"AGV63NB42"}value={pancardNo} />
              </div>
              <button>Save Business</button>
            </form>
          </div>
          {/* <Modal show={show} centered       size="md"
      aria-labelledby="contained-modal-title-vcenter" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{resultData['message']}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{resultData['message']}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
        </div>
      </div>
    </div>) : (<div></div>)
    }
    </div>

  );
};

export default EditBusiness;
