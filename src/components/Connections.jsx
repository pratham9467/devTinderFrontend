import React, { useEffect, useState } from "react";
import pass from "../assets/pass.svg";
import message from "../assets/message.svg";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import Requests from "./Requests";
import Loading from "./Loading";

const Connections = () => {
  const friends = useSelector((state) => state.connections);
  const dipatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      if (res.data.data && Array.isArray(res.data.data)) { // Check if data is an array
        if (res.data.data.length === 0) {
          setError("No Connections Found");
        } else {
          dipatch(addConnections(res.data.data));
        }
      } else {
        setError("Invalid data format");
      }
    } catch (err) {
      console.log(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (loading) {
    return (
      <div className="container max-w-md mx-auto">
        <Loading />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container max-w-md mx-auto">
        <div className="text-center text-2xl">{error}</div>
      </div>
    );
  }

  // Ensure friends is an array before mapping
  if (!friends || !Array.isArray(friends)) {
    return (
      <div className="container max-w-md mx-auto">
        <div className="text-center text-2xl">No Connections Found</div>
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="container max-w-md mx-auto">
        <div className="text-center text-2xl">No Connections Found</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full p-4 gap-2">
      <div className="container scroll-auto overflow-y-auto p-4">
        <div className="p-4 pb-2 bg-base-200 rounded-t-box shadow-md flex justify-between items-center">
          <div className="text-xl font-semibold opacity-60 tracking-wide"> Your Connections</div>
          <div>
            <div className="drawer w-full z-50">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content w-fit">
                <label htmlFor="my-drawer" className="btn bg-[#fc6a78] drawer-button">
                  Requests
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu bg-base-200 text-base-content min-h-full w-1/2 p-4">
                  <Requests />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="list bg-base-200 rounded-b-box shadow-md h-[70vh] overflow-y-auto">
          {friends.map(({ _id, fname, lname, profileUrl, gender, age }) => (
            <div key={_id}>
              <li className="list-row">
                <div>
                  <img className="size-10 rounded-box" src={profileUrl} />
                </div>
                <div>
                  <div className="uppercase font-semibold">{fname + " " + lname}</div>
                  <div className="text-xs uppercase opacity-60">{gender + ", " + age}</div>
                </div>
                <button className="btn btn-square btn-ghost">
                  <img src={message} alt="" height={25} width={25} />
                </button>
                <button className="btn btn-square btn-ghost">
                  <img src={pass} alt="" height={50} width={50} />
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="container max-h-[80vh] bg-base-300 rounded-box scroll-auto overflow-y-auto"></div>
    </div>
  );
};

export default Connections;