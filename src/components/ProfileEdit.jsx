import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import Toast from "./Toast";

const ProfileEdit = ({ editEnabled, user }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // Destructure with default values
  const {
    fname: initialFname = "",
    lname: initialLname = "",
    age: initialAge = "",
    gender: initialGender = "",
    email: initialEmail = "",
    about: initialAbout = "",
    skills: initialSkills = [],
    profileUrl: initialProfileUrl = "",
  } = user || {}; // Fallback to an empty object if user is undefined

  // Local state for editable fields
  const [fname, setFname] = useState(initialFname);
  const [lname, setLname] = useState(initialLname);
  const [age, setAge] = useState(initialAge);
  const [gender, setGender] = useState(initialGender);
  const [email, setEmail] = useState(initialEmail);
  const [about, setAbout] = useState(initialAbout);
  const [skills, setSkills] = useState(initialSkills.join(", ")); // Convert array to string
  const [profileUrl, setProfileUrl] = useState(initialProfileUrl);
  const [toast, setToast] = useState(false);

  // Update local state when the `user` prop changes
  useEffect(() => {
    setFname(initialFname);
    setLname(initialLname);
    setAge(initialAge);
    setGender(initialGender);
    setEmail(initialEmail);
    setAbout(initialAbout);
    setSkills(initialSkills.join(", "));
    setProfileUrl(initialProfileUrl);
  }, [user]);

  // Handle input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Save the updated user data
  const handleSave = async () => {
    const updatedUser = {
      fname,
      lname,
      age,
      gender,
      email,
      about,
      skills: skills.split(",").map((skill) => skill.trim()), // Convert string to array
      profileUrl,
    };
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", updatedUser, {
        withCredentials: true, // Include credentials
      });
      dispatch(addUser(res.data.user)); // Update Redux store with the new user data

      // Reload the page or navigate after toast disappears

      navigateTo(0); // Reload the page
    } catch (err) {
      console.error("Failed to update user:", err.response?.data || err.message);
    }
  };

  // Control toast visibility
  const handleSaveAndShowToast = async () => {
    setToast(!toast); // Show toast
    setTimeout(() => {
      setToast(false); // Hide toast after 3 seconds
    }, 1000);

    await handleSave();
  };
  return (
    <div className="p-6">
      {toast && <Toast message="Profile updated successfully!" />}
      <div className="text-2xl font-bold text-white">Profile</div>
      <div className="flex gap-4">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">First name</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={fname}
            onChange={handleInputChange(setFname)}
            disabled={!editEnabled}
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Last name</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={lname}
            onChange={handleInputChange(setLname)}
            disabled={!editEnabled}
          />
        </fieldset>
      </div>

      <div className="flex gap-4">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">What is your age</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={age}
            onChange={handleInputChange(setAge)}
            disabled={!editEnabled}
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Gender</legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={gender}
            onChange={handleInputChange(setGender)}
            disabled={!editEnabled}
          />
        </fieldset>
      </div>
      <div className="flex gap-4 ">
        {!editEnabled && (
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Email address?</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={email}
              onChange={handleInputChange(setEmail)}
              disabled={!editEnabled}
            />
          </fieldset>
        )}
        {editEnabled && (
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Profile URL</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={profileUrl}
              onChange={handleInputChange(setProfileUrl)}
            />
          </fieldset>
        )}
      </div>
      <div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Your bio</legend>
          <textarea
            className="textarea h-28 w-full resize-none"
            placeholder="Bio"
            value={about}
            onChange={handleInputChange(setAbout)}
            disabled={!editEnabled}></textarea>
        </fieldset>
      </div>
      <div>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Skills</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            value={skills}
            onChange={handleInputChange(setSkills)}
            disabled={!editEnabled}
          />
          <p className="fieldset-label">Separate with commas</p>
        </fieldset>
      </div>
      <div>
        {editEnabled && (
          <button className="btn w-full bg-[#fc6a78]" onClick={() => handleSaveAndShowToast()}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
