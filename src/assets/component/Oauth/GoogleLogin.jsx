import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../action/googleLoginAction";

export default function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginWithGoogle = async (responseGoogle) => {
    const accessToken = responseGoogle.access_token;
    dispatch(loginWithGoogle(accessToken, navigate));
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function");
      handleLoginWithGoogle(responseGoogle);
    },
  });
  return (
    <button
      variant="primary"
      onClick={googleLoginHandler}
      className="bg-stone-300 text-white font-semibold py-4 rounded-full focus:outline-none focus:ring transition-colors duration-300 hover:bg-gray-700 active:bg-gray-700 flex items-center justify-center gap-2 w-[200px] ease-in-out transform hover:scale-105"
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      {buttonText}
    </button>
  );
}
