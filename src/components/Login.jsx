import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router";

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
    <div className="flex items-center justify-center">
      <div className="card card-border bg-base-300 w-96">
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
              type="text"
              className="input"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
