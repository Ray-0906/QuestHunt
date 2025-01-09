import React from "react";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
//import { logout } from "../redux/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
 // const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Dispatch logout action to clear Redux state
    dispatch(logout());

    // Redirect to login page
   // navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={logoutButtonStyle}>
      Logout
    </button>
  );
};

// Optional: Add custom styles for the button
const logoutButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default LogoutButton;
