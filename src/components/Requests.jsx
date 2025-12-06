import React, { useCallback, useEffect, useState } from "react";
import pass from "../assets/pass.svg";
import like from "../assets/like.svg";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import Loading from "./Loading";
import { addConnections } from "../utils/connectionSlice";

const Requests = () => {
  const requests = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [requestTrigger, setRequestTrigger] = useState(0);

  const fetchRequests = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      // If no requests are found, set an error message
      if (res.data.data.length === 0) {
        setError("😔 No connection requests yet. Keep swiping!");
      } else {
        dispatch(addRequest(res.data.data)); // Dispatch requests to Redux store
      }
    } catch (err) {
      setError(err.response?.data?.message || "😞 Oops! Couldn't load requests. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  }, []);

  const handleRequest = useCallback(async (status, _id, fromUserId) => {
    try {
      await axios.post(BASE_URL + "/request/" + "receive/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
      if (status === "accepted") {
        dispatch(addConnections(fromUserId));
      }
      setRequestTrigger((prev) => prev + 1);
    } catch (err) {
      setError(err.response?.data?.message || "😞 Couldn't process that. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests, requestTrigger]);

  // Loading state
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
      <div className="container max-w-md mx-auto p-4">
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6 text-center">
          <p className="text-yellow-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  // No requests found
  if (requests.length === 0) {
    return (
      <div className="container max-w-md mx-auto p-4">
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-6 text-center">
          <p className="text-blue-400 text-lg">👋 No new requests right now. Check back soon!</p>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div>
      <div className="container max-w-md mx-auto">
        <ul className="list h-[95vh] bg-base-300 rounded-box shadow-md overflow-y-auto scroll-auto">
          <li className="p-4 pb-2 text-xl font-semibold opacity-60 tracking-wide">Likes</li>
          {requests.map(({ _id, fromUserId }) => (
            <div key={fromUserId._id}>
              <div className="list-row">
                <div>
                  <img className="size-14 rounded-box" src={fromUserId.profileUrl} alt="Profile" />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <div className="uppercase font-semibold">{fromUserId.fname + " " + fromUserId.lname}</div>
                  <div className="text-xs uppercase opacity-60">{fromUserId.gender + ", " + fromUserId.age}</div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <button className="btn btn-square btn-ghost" onClick={() => handleRequest("rejected", _id)}>
                    <img src={pass} alt="Pass" height={50} width={50} />
                  </button>
                  <button className="btn btn-square btn-ghost" onClick={() => handleRequest("accepted", _id)}>
                    <img src={like} alt="Like" height={25} width={25} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
