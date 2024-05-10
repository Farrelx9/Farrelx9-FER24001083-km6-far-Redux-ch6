import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logoutUser } from "../../action/authMeAction";
import { useNavigate } from "react-router-dom";

export default function AuthMe() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };

  return (
    <div>
      {userData ? (
        <div
          className="bg-gradient-to-t from-gray-800 to-gray-600 h-screen flex flex-col justify-center items-center text-white relative"
          style={{
            backgroundImage: `url('https://img.freepik.com/free-photo/landscape-mountains-black-white_119272-17.jpg?t=st=1713509989~exp=1713513589~hmac=683eb38601a3d8062128ad04c8a12c4b8b80319a27b0f1bd34b60401d1115001&w=1380')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <h2 className="text-3xl text-red-600 font-bold mb-4">User Profile</h2>
          <div className="bg-stone-950 bg-opacity-50 w-1/3 rounded-lg flex flex-col items-center p-20">
            <p className="mb-2">
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p className="mb-2">
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            <p className="mb-2">
              <span className="font-bold">Joined:</span> {userData.createdAt}
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-black text-center font-bold text text-3xl bg-gradient-to-t from-gray-800 to-gray-600  h-screen">
          Loading ...
        </p>
      )}
    </div>
  );
}
