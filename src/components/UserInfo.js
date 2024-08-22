import capitalizeStr from "@/functions/capitalizeStr";

export default function UserInfo({ visitAccountPage, user }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[url('../images/defaultProfilePicture.png')] bg-cover bg-center m-[10px] h-48 w-48 border-solid border-gray-300 border rounded-full"></div>
      <div>{capitalizeStr(user.username)}</div>
      <button type="button" onClick={() => visitAccountPage()}>
        Edit Profile
      </button>
      <div className="flex">
        <div>Followers: {user.profileInfo.followers.length}</div>
        <div>Following: {user.profileInfo.following.length}</div>
      </div>
    </div>
  );
}
