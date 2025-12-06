import React, { useState } from "react";
import like from "../assets/like.svg";
import pass from "../assets/pass.svg";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice";
import Loading from "./Loading";
import backgroundImage from "../assets/bgimage.avif";


const FeedCard = ({ user }) => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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
      className="w-auto h-screen bg-center bg-cover items-center justify-center flex relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex justify-center items-center py-4 absolute w-full h-full sm:w-auto sm:h-auto">
        <div 
          className="card glass glass-hover w-full max-w-sm sm:w-80 md:w-80 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing transition-transform duration-200 relative"
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
            opacity: Math.max(0.5, 1 - Math.abs(dragOffset.x) / 300)
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
          }}
          onMouseMove={(e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.clientX - dragStart.x;
            const y = e.clientY - dragStart.y;
            setDragOffset({ x, y });
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            setTimeout(() => {
              if (Math.abs(dragOffset.x) > 100) {
                handleClick(dragOffset.x > 0 ? 'like' : 'pass', _id);
              }
              setIsDragging(false);
              setDragOffset({ x: 0, y: 0 });
            }, 100);
          }}
          onMouseLeave={() => {
            if (isDragging) {
              setTimeout(() => {
                if (Math.abs(dragOffset.x) > 100) {
                  handleClick(dragOffset.x > 0 ? 'like' : 'pass', _id);
                }
                setIsDragging(false);
                setDragOffset({ x: 0, y: 0 });
              }, 100);
            }
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            setIsDragging(true);
            setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
          }}
          onTouchMove={(e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.touches[0].clientX - dragStart.x;
            const y = e.touches[0].clientY - dragStart.y;
            setDragOffset({ x, y });
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            if (Math.abs(dragOffset.x) > 100) {
              handleClick(dragOffset.x > 0 ? 'like' : 'pass', _id);
            }
            setIsDragging(false);
            setDragOffset({ x: 0, y: 0 });
          }}
        >
          <figure>
            <div className="w-full h-80 sm:h-75 overflow-hidden">
              <img className="h-full w-full" src={profileUrl} alt={`${fname}'s profile`} />
            </div>
          </figure>
          <div className="card-body p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{fullName}</h3>
              <span className="px-2 py-1 bg-blue-400 text-[#ffffff] text-md font-semibold rounded-full">{gender}</span>
            </div>
            
            <p className="text-white text-sm leading-relaxed line-clamp-3">{about}</p>
            
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-white/20 text-white text-xs rounded-lg">{skill}</span>
              ))}
              {skills.length > 3 && <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-lg">+{skills.length - 3}</span>}
            </div>
            
            <div className="flex justify-center gap-6 pt-2">
              <button
                className="w-14 h-14 glass glass-hover rounded-full flex items-center justify-center border border-red-400/50 hover:border-red-400 group"
                onClick={() => handleClick("pass", _id)}>
                <img className="w-7 h-7 group-active:scale-110 transition-transform" src={pass} alt="Pass" />
              </button>
              <button
                className="w-14 h-14 glass glass-hover rounded-full flex items-center justify-center border border-[#fe3c72]/50 hover:border-[#fe3c72] group"
                onClick={() => handleClick("like", _id)}>
                <img className="w-7 h-7 group-active:scale-125 transition-transform" src={like} alt="Like" />
              </button>
            </div>
            
            {isDragging && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 glass rounded-full px-4 py-2">
                {dragOffset.x > 20 && <span className="text-green-400 text-lg font-bold">❤️ LIKE</span>}
                {dragOffset.x < -20 && <span className="text-red-400 text-lg font-bold">❌ PASS</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
