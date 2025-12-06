import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/Constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigateTo("/login");
    } catch (err) {
      console.log(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      {userData && (
        <div className="navbar bg-linear-to-r from-[#fe3c72] to-[#ef4a75] shadow-lg">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost bg-white/10 hover:bg-white/20 text-lg rounded-2xl text-white border-0">
              🧑‍💻 DevTinder
            </Link>
          </div>

          <div className="flex gap-2 items-center">
            <div className="text-sm font-semibold text-white/90">
              Welcome, {userData?.data?.fname?.charAt(0).toUpperCase() + userData?.data?.fname?.slice(1)}
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-4 ml-2">
                <div className="w-12 rounded-full">
                  <img src={userData?.data?.profileUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge rounded-4xl">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/connections"}>My Connections</Link>
                </li>
                <li>
                  <a onClick={() => handleLogOut()}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
