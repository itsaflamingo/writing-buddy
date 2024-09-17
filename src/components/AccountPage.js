import useFetch, { updateData } from "../customHooks/useFetch";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/Contexts";

export default function AccountPage() {
  const { userData, setUserData } = useContext(UserContext);
  const { user } = userData;
  const { token } = user;

  const fetch = useFetch(token);

  const [input, setInput] = useState({
    username: user.user.username,
    password: "",
    bio: user.user.profileInfo.bio,
    profilePicture: user.user.profileInfo.profilePicture,
  });
  const [error, setError] = useState("");

  const onBioChange = (e) =>
    setInput({
      ...input,
      bio: e.target.value,
    });

  const onProfilePictureChange = (e) =>
    setInput({
      ...input,
      profilePicture: e.target.value,
    });

  const onUsernameChange = (e) =>
    setInput({ ...input, username: e.target.value });

  const onPasswordChange = (e) =>
    setInput({ ...input, password: e.target.value });

  // Check form validity
  const isFormValid = () => {
    if ((input.title || input.genre) === "") {
      setError("One of the fields must be filled");
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (isFormValid() === false) return;

    const updatedUser = {
      ...user.user,
      username: input.username,
      password: input.password,
      profileInfo: {
        ...user.user.profileInfo,
        bio: input.bio,
        profilePicture: input.profilePicture,
      },
    };

    fetch.updateData(user.user.url, updatedUser).then((res) => {
      setUserData({ user: res.data, setUserData });
    });
  };

  const deleteAccount = () => {
    fetch.deleteData(user.user.url).then((res) => {
      console.log(res);
      // Log out, print that user and all docs have been deleted.
    });
  };

  return (
    <div className="h-screen w-full flex content-start">
      <div className="m-7 w-2/4">
        <form onSubmit={(e) => submitForm(e)}>
          <div>
            <div>
              <label className="label">Username</label>
              <input
                className="input"
                onChange={(e) => onUsernameChange(e)}
                type="text"
                value={input.username}
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                className="input"
                onChange={(e) => onPasswordChange(e)}
                type="password"
              />
            </div>
            <div>
              <label className="label">Update bio: </label>
              <textarea
                className="input"
                onChange={(e) => onBioChange(e)}
                value={input.bio}
              />
            </div>
          </div>
          <button className="button2 my-4" type="submit">
            Update Preferences
          </button>
        </form>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 text-black-ish"
          onClick={() => deleteAccount()}
        >
          Delete Account
        </button>
      </div>
      <div className="relative">
        <label className="label mt-7">Profile Picture</label>
        <div className="bg-[url('../images/defaultProfilePicture.png')] bg-cover bg-center m-[10px] h-60 w-60 border-solid border-gray-300 border rounded-full"></div>
        <button className="button2 my-4 absolute top-60 left-10">Edit</button>
      </div>
    </div>
  );
}
