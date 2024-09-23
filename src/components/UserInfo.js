import useFetch from "@/customHooks/useFetch";
import capitalizeStr from "@/functions/capitalizeStr";
import { useState } from "react";

export default function UserInfo({ visitAccountPage, user, token }) {
  // const fetch = useFetch(token);
  // const [following, setFollowing] = useState(user.profileInfo.following);

  // const followUser = () => {
  //   console.log(user.profileInfo.following);

  //   setFollowing([...following, { user: user.id }]);

  //   const updatedUser = {
  //     ...user,
  //     profileInfo: {
  //       ...user.profileInfo,
  //       following: [...following],
  //     },
  //   };
  //   // patch user following
  //   fetch.updateData(user.url, updatedUser);
  // };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-[url('../images/defaultProfilePicture.png')] bg-cover bg-center m-[10px] h-80 w-80 border-solid border-gray-300 border rounded-full"></div>
      <div className="text-6xl font-bold">{capitalizeStr(user.username)}</div>
      <button type="button" onClick={() => visitAccountPage()}>
        Edit Profile
      </button>
      {/* <button type="button" onClick={() => followUser()}>
        Follow
      </button>
      <div className="flex">
        <div>Followers: {user.profileInfo.followers.length}</div>
        <div>Following: {user.profileInfo.following.length}</div>
      </div> */}
    </div>
  );
}
