import React, { useContext, useEffect,useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CaptainProtectedWraper = ({ children }) => {

  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setisLoading] = useState(true)
  console.log(token);

  useEffect(() => {
    if (!token) {
      Navigate("/captain-login");
    }
  }, [token]);

  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
  }).then(response=>{
    if(response.status === 200 || response.status === 201) {
      const data = response.data;
      setCaptain(response.data.captain);
      setisLoading(false)
    }
  }).catch(err=>{
    console.error("Error fetching captain profile:", err);
    localStorage.removeItem("token");
    Navigate("/captain-login");
  })


  if(isLoading){
    return <div>Loading...</div>
  }

  return <>{children}</>;
};

export default CaptainProtectedWraper;
