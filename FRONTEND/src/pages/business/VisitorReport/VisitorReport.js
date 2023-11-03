import React,{useEffect} from 'react'
import { useNavigate } from 'react-router';

const VisitorReport = () => {
  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  useEffect(() => {
    if (userdata.role === "ADMIN") {
      navigate('/BusinessWiseReport');
    }
    if (userdata.role === "ATTENDANT") {
      navigate('/FillForm');
    }
  }, [userdata.role]);
  return (
    <div>VisitorReport</div>
  )
}

export default VisitorReport