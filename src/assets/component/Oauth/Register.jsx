import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRegistrationState,
  setEmail,
  setEmailError,
  setPassword,
  setPasswordError,
  setRegistrationSuccess,
  setUsername,
  setUsernameError,
} from "../../reducers/registerReducer";
import { registerUser } from "../../action/registerAction";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const registerState = useSelector((state) => state.register);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    dispatch(setUsername(event.target.value));
  };

  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    dispatch(setPassword(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!registerState.username) {
      dispatch(setUsernameError());
      return;
    }
    if (!registerState.email) {
      dispatch(setEmailError());
      return;
    }
    if (!registerState.password) {
      dispatch(setPasswordError());
      return;
    }

    try {
      // Call registerUser action
      const response = await dispatch(
        registerUser(
          registerState.username,
          registerState.email,
          registerState.password
        )
      );

      // Check if registration was successful
      if (response && response.status === 201) {
        // Registration successful, navigate to login page
        dispatch(setRegistrationSuccess());
     
      } else {
        // Handle other response statuses or errors if needed
        console.log("Registration failed:", response);
        // You can dispatch an action to set error state here if needed
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration error, you can dispatch an action to set error state here if needed
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetRegistrationState());
    };
  }, [dispatch]);

  return (
    <div
      className="bg-gray-600 flex flex-col h-screen items-center justify-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/landscape-mountains-black-white_119272-17.jpg?t=st=1713509989~exp=1713513589~hmac=683eb38601a3d8062128ad04c8a12c4b8b80319a27b0f1bd34b60401d1115001&w=1380')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="text-6xl font-Bebas mb-4 ms-2 text-red-600 hover:cursor-pointer"
        onClick={() => dispatch(resetRegistrationState())} // Reset state when clicking logo
      >
        ICLIX
      </div>
      <div className="p-32 shadow-2xl bg-stone-950 bg-opacity-65 flex flex-col items-center w-1/3">
        <div className="mb-8">
          <strong className="text-2xl font-bold text-white">Register</strong>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            className={`mb-4 rounded-lg p-2 bg-transparent border-2 text-white ${
              registerState.usernameError ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="Username"
            value={registerState.username}
            onChange={handleUsernameChange}
          />
          <input
            className={`mb-4 rounded-lg p-2 bg-transparent border-2 text-white ${
              registerState.emailError ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="Email"
            value={registerState.email}
            onChange={handleEmailChange}
          />
          <input
            className={`mb-4 rounded-lg p-2 bg-transparent border-2 text-white ${
              registerState.passwordError ? "border-red-500" : "border-gray-300"
            }`}
            type="password"
            placeholder="Password"
            value={registerState.password}
            onChange={handlePasswordChange}
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="font-bold text-xl rounded-full p-2 w-[38%] text-white bg-red-500 hover:bg-red-600"
          >
            Submit
          </button>
        </form>
        {registerState.error && (
          <div className="text-red-500 mt-4">{registerState.error}</div>
        )}
        {registerState.registrationSuccess && (
          <div className="text-lg text-white mt-4">
            Registration successful!
          </div>
        )}
        <div className="text-sm font-semibold text-white flex items-center mt-3 ">
          <div className="mr-1">Already have an account?</div>
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here.
          </div>
        </div>
      </div>
    </div>
  );
}
