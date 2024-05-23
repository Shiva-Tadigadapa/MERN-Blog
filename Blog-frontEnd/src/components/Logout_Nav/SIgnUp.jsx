import React from "react";
import gPng from "../../assets/Google.png";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailure, loginStart } from "../../redux/userSlice";
import { useMainDashContext } from "../../context/AppContext";
const SIgnUp = () => {
  const dispatch = useDispatch();
  const { SignUpTrue, setSignUpTrue } = useMainDashContext();

  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [password, setHidePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordChange = (event) => {
    setHidePassword(event.target.value);
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const SetEmalFunc = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "https://backbone-l7ed.onrender.com/api/signup",
        { name, email, password }
      );
      console.log(res);
      setSignUpTrue(true);
      alert("User Created");
    } catch (err) {
      dispatch(loginFailure());
      console.log(err);
    }
  };

  return (
    <>
      <div class=" -ml-10 ">
        <div class="px-6 py-4">
          <h2 class="text-3xl text-[#4B6587] font-bold mb-2">
            Register Youself below
          </h2>
          <form onSubmit={handleSubmit} className=" mt-5">
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2" for="name">
                Username
              </label>
              <input
                class="appearance-none   rounded-md  w-80 py-3.5 px-3 text-gray-700 leading-tight  focus:outline-none  focus:bg-[#F7F6F2]  bg-[#F7F6F2]"
                id="name"
                type="text"
                placeholder="Enter your Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2" for="email">
                Email
              </label>
              <input
                class="appearance-none   rounded-md  w-80 py-3.5 px-3 text-gray-700 leading-tight  focus:outline-none  focus:bg-[#F7F6F2]  bg-[#F7F6F2]"
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(event) => SetEmalFunc(event)}
              />
            </div>
            <div class="mb-6">
              <label htmlFor="password">Password:</label>
              <div className="relative">
                <input
                  className="appearance-none rounded-md w-80 py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-[#F7F6F2] bg-[#F7F6F2]"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="........................"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-3 mr-4"
                  onClick={handleToggleShowPassword}
                >
                  {showPassword ? (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9.879V6a2 2 0 00-2-2h-4.586a1 1 0 00-.707.293L12.707 5.3A1 1 0 0012.586 6
                "
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between w-[320px]">
              <button
                class="bg-[#4B6587] hover:bg-[#4B6587]/70 text-white w-[100%] font-bold py-2 px-4 shadow-2xl shadow-blue-800 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                // onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SIgnUp;
