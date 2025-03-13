import React from "react";
import like from "../assets/like.svg";
import pass from "../assets/pass.svg";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice";
import Loading from "./Loading";
import backgroundImage from "../assets/bgimage.jpg";


const FeedCard = ({ user }) => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  // Early return if user is not provided
  if (!user) {
    return <Loading />;
  }

  const { _id, fname, lname, age, gender, skills, profileUrl, about } = user;

  const handleClick = async (status, id) => {
    dispatch(removeFeed(_id));
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${id}`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Error sending request:", err);
      // Optionally, show a toast or alert to the user
      dispatch(addFeed([...feed, user]));
    }
  };

  // Format the user's full name
  const fullName = `${fname[0].toUpperCase() + fname.slice(1)} ${lname[0].toUpperCase() + lname.slice(1)}, ${age}`;

  return (
    <div
      className="w-auto h-[100vh] bg-center bg-cover items-center justify-center flex relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex justify-center items-center py-4 absolute">
        <div className="card bg-base-300 w-72 shadow-2xl shadow-gray-950">
          <figure>
            <div className="w-80 h-72 overflow-hidden object-fill">
              <img className="h-full w-full object-fill" src={profileUrl} alt={`${fname}'s profile`} />
            </div>
          </figure>
          <div className="card-body py-2">
            <h3 className="card-title">{fullName}</h3>
            <h4 className="card-title font-semibold text-sm">Gender: {gender}</h4>
            <legend className="fieldset-legend m-0 p-0">Bio</legend>
            <p className="font-semibold bg-base-100 rounded-2xl p-2 w-full h-20 overflow-y-auto scroll-auto">{about}</p>
            <p className="font-semibold">Skills: {skills.join(", ")}</p>
            <div className="card-actions justify-between my-1 px-6">
              <button
                className="border bg-base-100 rounded-full overflow-hidden p-0.5 hover:scale-110 transition-transform"
                onClick={() => handleClick("pass", _id)}>
                <img className="active:scale-110 transition-transform" src={pass} height={40} width={40} alt="Pass" />
              </button>
              <button
                className="flex items-center justify-center border bg-base-100 rounded-full overflow-hidden p-2 hover:scale-110 transition-transform"
                onClick={() => handleClick("like", _id)}>
                <img className="active:scale-125 transition-transform" src={like} height={30} width={30} alt="Like" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
