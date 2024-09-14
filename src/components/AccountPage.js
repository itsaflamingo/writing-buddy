import useFetch, { updateData } from "../customHooks/useFetch";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/Contexts";

export default function AccountPage() {
  const { userData, setUserData } = useContext(UserContext);
  const { user } = userData;
  const { token } = user;

  const fetch = useFetch(token);

  const [input, setInput] = useState({
    bio: "",
    profilePicture: "",
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

  // Check form validity
  const isFormValid = () => {
    if ((input.title || input.genre) === null) {
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
      profileInfo: {
        ...user.user.profileInfo, // Spread existing profileInfo
        bio: input.bio, // Update bio
        profilePicture: input.profilePicture, // Update profile picture
      },
    };

    fetch.updateData(user.user.url, updatedUser).then((res) => {
      console.log(res);
      setUserData({ user: res.data, setUserData });
    });
  };

  return (
    <div className="h-screen w-3/4 flex content-start">
      <form onSubmit={(e) => submitForm(e)}>
        <div>
          <div>
            <label>Update bio: </label>
            <textarea
              className="border"
              onChange={(e) => onBioChange(e)}
              value={input.bio}
            />
          </div>
          <div>
            <label>Update profile picture: </label>
            <input
              className="border"
              onChange={(e) => onProfilePictureChange(e)}
              type="text"
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
