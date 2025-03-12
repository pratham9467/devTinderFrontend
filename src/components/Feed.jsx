import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import Loading from "./Loading";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const feedData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    feedData();
  }, []);

  return <>{feed ? <div className="my-3">{<FeedCard user={feed} />}</div> : <Loading />}</>;
};

export default Feed;
