import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/contexts/Contexts";
import useFetch from "@/customHooks/useFetch";

export default function Logout() {
  const router = useRouter();

  const { userData, setUserData } = useContext(UserContext);
  const { user } = userData;
  const { token } = user;

  const fetch = useFetch(token);

  const logOut = () => {
    fetch.getData("/logout", token);

    router.push({
      pathname: "/",
    });
    setUserData(null);
  };

  return (
    <button type="button" onClick={() => logOut()}>
      Log Out
    </button>
  );
}
