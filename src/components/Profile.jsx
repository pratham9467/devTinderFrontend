import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import Loading from "./Loading";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Loading />;
  }

  if (!user.data) {
    return <div>No user data available</div>;
  }

  return (
    <div className="flex gap-6 px-6 my-3">
      <div className="bg-base-300 w-full rounded-lg overflow-hidden">
        <ProfileEdit user={user.data} />
      </div>
      <div className="my-auto">
        <UserCard user={user.data} />
      </div>
    </div>
  );
};

export default Profile;
