import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router";
import backgroundImage from "../assets/bgimage.jpg";

const Login = () => {
  const [email, setEmail] = useState("pratham@gmail.com");
  const [password, setPassword] = useState("Pratham@123");
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
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="w-auto h-[100vh] bg-center bg-cover items-center justify-center flex relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
       <div className="absolute inset-0 bg-black/50"></div>
        <div className="card card-border bg-black/80 shadow-lg shadow-black w-96">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
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
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center my-4">
              <button className="btn bg-[#fc6a78]" onClick={() => handleSubmit()}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
