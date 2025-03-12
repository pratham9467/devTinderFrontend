import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const userData = useSelector((state) => state.user);

  const fetchData = async () => {
    if (userData) {
      return navigateTo("/");
    }
    try {
      if (!userData) {
        const Userprofile = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
        dispatch(addUser(Userprofile.data));
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigateTo("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
