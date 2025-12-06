import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router";
import backgroundImage from "../assets/bgimage.avif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigateTo("/");
    } catch (err) {
      const errorMsg = err?.response?.data || "Oops! Something went wrong. Please try again.";      
      setError(typeof errorMsg === 'string' ? errorMsg : errorMsg.message || "Invalid email or password. Let's try that again!");
    }
  };
  return (
    <div
      className="w-auto h-screen bg-center bg-cover items-center justify-center flex relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="card card-border bg-[#424242]/20 backdrop-blur-xl shadow-2xl shadow-[#fe3c72]/30 w-96 border border-[#fe3c72]/30">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-[#fe3c72]">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input"
              placeholder="John@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">❌ {error}</p>
            </div>
          )}
          <div className="card-actions justify-center my-4">
            <button className="btn glass glass-hover bg-linear-to-r from-[#fe3c72]/80 to-[#ef4a75]/80 text-white border-0" onClick={() => handleSubmit()}>
              Login
            </button>
          </div>
          <div className="flex justify-center text-center">
            <p className="text-white/60 text-base">
              New here?{"  "}
              <span
                className="font-semibold underline cursor-pointer hover:text-white/100 transition-colors"
                onClick={() => navigateTo("/signUp")}>
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
