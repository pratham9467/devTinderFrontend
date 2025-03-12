import React, { useState } from "react";
import ProfileEdit from "./ProfileEdit";

const UserCard = ({ user }) => {
  const [editEnabled, setEditEnabled] = useState(false);
  const { fname, lname, age, gender, skills, profileUrl, about } = user;

  const onClickEdit = () => {
    setEditEnabled(true);
  };

  return (
    user && (
      <div
        className="flex justify-center items-center
      ">
        <div className="card bg-base-300 w-80 shadow-sm">
          <figure>
            <div className="w-80 h-72 overflow-hidden object-fill">
              <img className="h-full w-full object-fill" src={profileUrl} />
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {fname.slice(0, 1).toUpperCase() +
                fname.slice(1) +
                " " +
                lname.slice(0, 1).toUpperCase() +
                lname.slice(1) +
                ", " +
                age}
            </h2>
            <h3 className="card-title font-semibold text-sm">Gender: {gender}</h3>
            <legend className="fieldset-legend m-0 p-0">About</legend>
            <div className="font-semibold bg-base-100 rounded-2xl p-2 overflow-y-auto max-h-[170px]">{about}</div>
            <p className="font-semibold">Skills: {skills.join(", ")}</p>

            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex justify-center">
                <label
                  htmlFor="my-drawer"
                  className="btn drawer-button bg-[#fc6a78] rounded-full px-10 py-4 leading-0 font-semibold text-center text-white text-lg active:bg-[#d24553] transition-colors"
                  onClick={() => onClickEdit()}>
                  Edit
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu bg-base-200 text-base-content min-h-full w-[70%] p-4">
                  <div className="bg-base-300 w-full rounded-lg overflow-hidden">
                    {<ProfileEdit editEnabled={editEnabled} user={user} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
