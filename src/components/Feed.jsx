import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import Loading from "./Loading";
import backgroundImage from "../assets/bgimage.jpg";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (err) {
        console.error("Error fetching feed data:", err);
      }
    };

    fetchFeedData();
  }, [dispatch]);

  // Handle empty feed array
  if (feed.length === 0) {
    return (
      <div
        className="w-auto h-[100vh] bg-center bg-cover items-center justify-center flex relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="flex flex-col justify-center items-center h-[100vh] gap-16 absolute">
          <p className="text-center font-semibold text-2xl">
            Looks like you've swiped through everyone!
            <br /> Come back later for more matches.
          </p>
          <span className="loading loading-ring w-12"></span>
        </div>
      </div>
    );
  }

  return <div>{feed.length > 0 ? <FeedCard user={feed[0]} /> : <Loading />}</div>;
};

export default Feed;
