import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";
import backgroundImage from "../assets/bgimage.jpg";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isformValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigateTo = useNavigate();

  // Handle input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    const skillsArray = skills.split(",").map((skill) => skill.trim());

    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          fname: fname,
          lname: lname,
          age: age,
          gender: gender,
          profileUrl: profileUrl,
          skills: skillsArray,
          about: about,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      navigateTo("/");
    } catch (err) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);

      setErrorMessage(err.response.data);
    }
  };

  useEffect(() => {
    const isValid =
      fname && lname && age && gender && email && password && confirmPassword && password === confirmPassword;
    setIsFormValid(isValid);
  }, [fname, lname, age, gender, email, password, confirmPassword]);

  return (
    <div className="w-auto py-6 bg-center bg-cover relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="w-full max-w-2xl mx-auto bg-black/80 rounded-lg shadow-lg shadow-black">
        <div className="p-6">
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
              />
            </fieldset>
          </div>
          <div className="flex gap-4 ">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Email address?</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={email}
                onChange={handleInputChange(setEmail)}
              />
            </fieldset>
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
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your bio</legend>
              <textarea
                className="textarea h-28 w-full resize-none z-10"
                placeholder="Bio"
                value={about}
                onChange={handleInputChange(setAbout)}
                disabled={false}></textarea>
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
              />
              <p className="fieldset-label">Separate with commas</p>
            </fieldset>
          </div>
          <div className="flex gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input w-full"
                placeholder="Type here"
                value={password}
                onChange={handleInputChange(setPassword)}
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Confirm Password</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
              />
            </fieldset>
          </div>
          <div className="z-10 h-auto min-h-16 flex items-center overflow-y-auto overflow-x-hidden">
            {error && <p className="text-red-500 text-sm font-semibold leading-normal">{errorMessage}</p>}
          </div>
          <div className="z-10 relative">
            <button className="btn w-full bg-[#fc6a78]" onClick={handleSubmit} disabled={!isformValid}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
