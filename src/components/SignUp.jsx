import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";
import backgroundImage from "../assets/bgimage.avif";
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

      navigateTo("/profile");
    } catch (err) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);

      const errorMsg = err?.response?.data?.error || err?.response?.data;
      setErrorMessage(typeof errorMsg === 'string' ? errorMsg : "Hmm, we couldn't create your account. Please check your details and try again!");
    }
  };

  useEffect(() => {
    const isValid =
      fname && lname && age && gender && email && password && confirmPassword && password === confirmPassword;
    setIsFormValid(isValid);
  }, [fname, lname, age, gender, email, password, confirmPassword]);

  return (
    <div className="w-full min-h-screen py-4 sm:py-6 bg-center bg-cover relative px-4" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="w-full max-w-2xl mx-auto glass glass-hover rounded-2xl">
        <div className="p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-[#fe3c72] mb-2">Create Profile ✨</div>
          <p className="text-white/60 text-sm mb-4">Join the developer community</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">First name</legend>
              <input
                type="text"
                className="input transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                placeholder="John"
                value={fname}
                onChange={handleInputChange(setFname)}
              />
              {fname && <span className="text-green-400 text-xs">✓</span>}
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Last name</legend>
              <input
                type="text"
                className="input transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                placeholder="Doe"
                value={lname}
                onChange={handleInputChange(setLname)}
              />
              {lname && <span className="text-green-400 text-xs">✓</span>}
            </fieldset>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">What is your age</legend>
              <input
                type="number"
                className="input transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                placeholder="25"
                value={age}
                onChange={handleInputChange(setAge)}
              />
              {age && <span className="text-green-400 text-xs">✓</span>}
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Gender</legend>
              <select
                className="input transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                value={gender}
                onChange={handleInputChange(setGender)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {gender && <span className="text-green-400 text-xs">✓</span>}
            </fieldset>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Email address?</legend>
              <input
                type="email"
                className="input transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                placeholder="john@example.com"
                value={email}
                onChange={handleInputChange(setEmail)}
              />
              {email && email.includes('@') && <span className="text-green-400 text-xs">✓</span>}
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Profile URL</legend>
              <input
                type="url"
                className="input transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                placeholder="https://example.com/photo.jpg"
                value={profileUrl}
                onChange={handleInputChange(setProfileUrl)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your bio</legend>
              <textarea
                className="textarea h-28 w-full resize-none z-10 transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                placeholder="Tell us about yourself..."
                value={about}
                onChange={handleInputChange(setAbout)}
                disabled={false}></textarea>
              <p className="text-xs text-white/40 mt-1">{about.length} characters</p>
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                className="input w-full transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                placeholder="JavaScript, React, Node.js"
                value={skills}
                onChange={handleInputChange(setSkills)}
              />
              <p className="fieldset-label">Separate with commas</p>
              {skills && <div className="flex flex-wrap gap-1 mt-2">{skills.split(',').map((s, i) => s.trim() && <span key={i} className="badge badge-sm bg-[#fe3c72]/20 text-[#fe3c72] border-0">{s.trim()}</span>)}</div>}
            </fieldset>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input w-full transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                placeholder="••••••••"
                value={password}
                onChange={handleInputChange(setPassword)}
              />
              {password && password.length >= 6 && <span className="text-green-400 text-xs">✓ Strong</span>}
              {password && password.length < 6 && <span className="text-yellow-400 text-xs">⚠ Too short</span>}
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Confirm Password</legend>
              <input
                type="password"
                className="input w-full transition-all duration-200 focus:border-[#fe3c72] focus:ring-2 focus:ring-[#fe3c72]/50"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
              />
              {confirmPassword && password === confirmPassword && <span className="text-green-400 text-xs">✓ Match</span>}
              {confirmPassword && password !== confirmPassword && <span className="text-red-400 text-xs">✗ No match</span>}
            </fieldset>
          </div>
          <div className="z-10 h-auto min-h-16 flex items-center overflow-y-auto overflow-x-hidden">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 w-full">
                <p className="text-red-400 text-sm font-semibold leading-normal">❌ {errorMessage}</p>
              </div>
            )}
          </div>
          <div className="z-10 relative">
            <button 
              className="btn w-full bg-linear-to-r from-[#fe3c72] to-[#ef4a75] hover:from-[#fd5564] hover:to-[#fe3c72] text-white border-0 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
              onClick={handleSubmit} 
              disabled={!isformValid}
            >
              {isformValid ? '🚀 Create Account' : '📝 Fill all fields'}
            </button>
            <p className="text-center text-white/60 text-sm mt-2">
              Already have an account?{' '}
              <span className="text-[#fe3c72] cursor-pointer hover:underline" onClick={() => navigateTo('/login')}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
