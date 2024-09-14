import { UserContext } from "@/contexts/Contexts";
import useFetch from "@/customHooks/useFetch";
import { useContext } from "react";

export default function Settings() {
  const { userData } = useContext(UserContext);
  const { user } = userData;
  const { token } = user;

  const fetch = useFetch(token);

  const deleteAcct = () => {
    fetch.deleteData(user.user.url).then((res) => {
      console.log(res);
      // Log out, print that user and all docs have been deleted.
    });
  };

  return (
    <div>
      <button>Change Username</button>
      <button>Change Password</button>
      <button onClick={() => deleteAcct()}>Delete Account</button>
    </div>
  );
}
