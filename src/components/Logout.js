import { useContext } from "react";
import { useRouter } from "next/router";
import {
  ActContext,
  ChapterContext,
  ProjectContext,
  UserContext,
} from "@/contexts/Contexts";
import useFetch from "@/customHooks/useFetch";

export default function Logout() {
  const router = useRouter();

  const { userData, setUserData } = useContext(UserContext);
  const { setProjects } = useContext(ProjectContext);
  const { setActs } = useContext(ActContext);
  const { setChapters } = useContext(ChapterContext);
  const { user } = userData;
  const { token } = user;

  const fetch = useFetch(token);

  const logOut = () => {
    fetch.getData("/logout");

    router.push({
      pathname: "/",
    });
    setUserData(null);
    setProjects(null);
    setActs(null);
    setChapters(null);
  };

  return (
    <button type="button" onClick={() => logOut()}>
      Log Out
    </button>
  );
}
