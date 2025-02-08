import axios from "axios";
import { login, logout } from "../store/authSlice";

const endpoint = import.meta.env.VITE_API_URL ;

// Login action
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${endpoint}/user/login`, {
      email,
      password,
    });

    const data = response.data;
    

    // Dispatch the login action
    dispatch(login({ userData: data.user, token: data.token }));

    // Optional: Save the token in localStorage for persistence
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
  }
};

// Logout action
export const logoutUser = () => (dispatch) => {
  // Remove the token from localStorage
  localStorage.removeItem("token");

  // Dispatch the logout action
  dispatch(logout());
};

// Auth persistence on reload
export const initializeAuth = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.post(
        `${endpoint}/get/me`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const userData = response.data;

      // Dispatch login to update Redux store
      dispatch(login({ userData, token }));
    } catch (error) {
      console.error("Error during auth initialization:", error.response?.data?.message || error.message);
      dispatch(logout());
    }
  } else {
    dispatch(logout());
  }
};

// Auth check
export const handleAuthCheck = async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.post(
        `${endpoint}/get/me`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const userData = response.data;

      // Dispatch login to update Redux store
      dispatch(login({ userData, token }));
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data?.message || error.message);
      dispatch(logout());
    }
  } else {
    dispatch(logout());
  }
};

// Signup action
export const signupUser = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${endpoint}/user/`, {
      username,
      email,
      password,
    });

    const data = response.data;
    console.log(data);

    // Dispatch login to save token and user data
    dispatch(login({ userData: data.user, token: data.token }));

    // Optional: Save the token in localStorage
    localStorage.setItem("token", data.token);

    console.log("Signup successful:", data);
  } catch (error) {
    console.error("Signup error:", error.response?.data?.message || error.message);
    alert(error.response?.data?.message || "Signup failed");
  }
};
