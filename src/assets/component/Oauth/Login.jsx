import React, { useState } from "react";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../action/loginAction";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.login.error);
  const user = useSelector((state) => state.login.user);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setEmailError(true);
      return;
    }
    if (!password.trim()) {
      setPasswordError(true);
      return;
    }

    dispatch(loginUser(email, password, navigate));
  };

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
        onClick={() => navigate("/")}
      >
        ICLIX
      </div>
      <div className="p-32 shadow-2xl bg-stone-950 bg-opacity-65 flex flex-col items-center w-1/3">
        <div className="mb-8">
          <strong className="text-2xl font-bold text-white">Login</strong>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className={`mb-4 rounded-lg p-2 bg-transparent border-2 text-white  ${
              emailError ? "border-red-500" : "border-gray-300"
            } hover:placeholder-white`}
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <div className="relative">
            <input
              className={`mb-2 rounded-lg p-2 bg-transparent border-2 text-white ${
                passwordError ? "border-red-500" : "border-gray-300"
              } hover:placeholder-white`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 bottom-2 px-2 flex items-center"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FaEyeSlash className=" text-stone-400" size={20} />
              ) : (
                <IoEyeSharp className=" text-stone-400" size={20} />
              )}
            </button>
          </div>
          <br />
          <button
            type="submit"
            className="font-bold text-xl  rounded-full p-2 w-3/4 ms-6 mb-4 text-white bg-red-500 hover:bg-red-600"
          >
            Submit
          </button>
        </form>
        <GoogleLogin buttonText="Login With Google" />
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        {user && user.username && (
          <div className="text-lg text-white font-semibold mt-2">
            Login successful, welcome {user.username}!
          </div>
        )}
        <div className="text-sm font-semibold text-white flex items-center mt-3 ">
          <div className="mr-1">New to Iclix?</div>
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() => navigate("/Register")}
          >
            Register now.
          </div>
        </div>
      </div>
    </div>
  );
}
