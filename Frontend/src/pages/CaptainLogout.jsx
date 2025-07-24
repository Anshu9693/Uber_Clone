import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200 || response.status === 201) {
            localStorage.removeItem('token')
            navigate('/captain-login')
        }
    }).catch((error) => {
        console.error("Logout failed:", error);
    })
  return (
    <div>
      <h1>logout successfully </h1>
    </div>
  )
}

export default CaptainLogout
