import useFetch, { updateData } from "../customHooks/useFetch";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/Contexts";

export default function AccountPage() {
  const { userData } = useContext(UserContext);
  const { user } = userData;
  const { token } = user;

  const fetch = useFetch();

  const [input, setInput] = useState({
    ...user,
    profileInfo: {
      ...user.profileInfo,
      bio: null,
      profilePicture: null,
    },
  });
  const [error, setError] = useState(null);

  console.log(userData);

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
    console.log(token);
    fetch
      .updateData(`/user/${user.user._id}/update`, input, token)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="h-screen w-3/4 flex content-start">
      <form onSubmit={(e) => submitForm(e)}>
        <div>
          <div>
            <label>Update bio: </label>
            <textarea className="border" />
          </div>
          <div>
            <label>Update profile picture: </label>
            <input className="border" />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
