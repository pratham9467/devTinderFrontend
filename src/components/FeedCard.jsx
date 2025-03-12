import React from "react";
import like from "../assets/like.svg";
import pass from "../assets/pass.svg";

const FeedCard = ({ user }) => {
  const { fname, lname, age, gender, skills, profileUrl, about } = user[0];
  return (
    user && (
      <div
        className="flex justify-center items-center
      ">
        <div className="card bg-base-300 w-72 shadow-sm">
          <figure>
            <div className="w-80 h-64 overflow-hidden object-fill">
              <img className="h-full w-full object-fill" src={profileUrl} />
            </div>
          </figure>
          <div className="card-body py-2">
            <h3 className="card-title">
              {fname.slice(0, 1).toUpperCase() +
                fname.slice(1) +
                " " +
                lname.slice(0, 1).toUpperCase() +
                lname.slice(1) +
                ", " +
                age}
            </h3>
            <h4 className="card-title font-semibold text-sm">Gender: {gender}</h4>
            <legend className="fieldset-legend m-0 p-0">Bio</legend>
            <p className="font-semibold bg-base-100 rounded-2xl p-2">{about}</p>
            <p className="font-semibold">Skills: {skills.join(", ")}</p>
            <div className="card-actions justify-between my-1 px-6">
              <button className="border bg-base-100 rounded-full overflow-hidden p-0.5 hover:scale-110 transition-transform">
                <img className="active:scale-110 transition-transform" src={pass} height={40} width={40} />
              </button>
              <button className="flex items-center justify-center border bg-base-100 rounded-full overflow-hidden p-2 hover:scale-110 transition-transform">
                <img className="active:scale-125 transition-transform" src={like} height={30} width={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FeedCard;
