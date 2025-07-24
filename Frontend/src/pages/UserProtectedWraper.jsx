import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWraper = ({ children }) => {
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const { user, setUser } = useContext(UserDataContext);
  console.log(token);
  useEffect(() => {
    if (!token) {
      Navigate("/login");
    }
  }, []);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setUser(response.data.user);
        setisLoading(false);
      }
    })
    .catch((err) => {
      console.error("Error fetching user profile:", err);
      localStorage.removeItem("token");
      Navigate("/login");
    });

  return <>{children}</>;
};

export default UserProtectedWraper;
