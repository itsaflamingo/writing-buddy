/* eslint-disable consistent-return */
import { useState, useEffect, useContext } from "react";
import useFetch from "./useFetch";
import {
  ActContext,
  ChapterContext,
  CurrentActContext,
  CurrentProjectContext,
  ProjectContext,
} from "@/contexts/Contexts";

export default function useSwitchCollection({
  id,
  token,
  collection,
  data,
  user,
}) {
  const { projects, setProjects } = useContext(ProjectContext);
  const { acts, setActs } = useContext(ActContext);
  const { setChapters } = useContext(ChapterContext);

  const { setCurrentProject } = useContext(CurrentProjectContext);
  const { setCurrentAct } = useContext(CurrentActContext);

  const [requestedData, setRequestedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useFetch(token);

  useEffect(() => {
    if (data) return;
    setLoading(true);
    if (collection === "projects") {
      // If projects context is empty, get new data, and use it to populate projects
      // If projects context not empty, simply rerturn projects context data
      if (projects === null) {
        // Get data, set state to returned data
        fetchData(user.list_projects);
        setProjects(requestedData);
      }
      setRequestedData(projects);
      setLoading(false);
    }
    if (collection === "acts") {
      // Get current project
      const project = projects.filter((project) => project.id === id);
      // Get data, set state to returned data
      fetchData(project[0].list_acts);
      // Set acts context to returned data
      setActs(requestedData);
      // Set current project context to project connected to acts
      setCurrentProject(project);
    }
    if (collection === "chapters") {
      // Get current act
      const act = acts.filter((act) => act._id === id);
      // Get data, set state to returned data
      fetchData(act[0].list_chapters);
      // Set chapters context to returned data
      setChapters(requestedData);
      // Set current act context to act connected to chapters
      setCurrentAct(() => acts.filter((act) => act._id === id));
    }

    return () => setRequestedData(null);
  }, [requestedData, data, collection]);

  const fetchData = (url) => {
    fetch
      .getData(url)
      .then((res) => {
        // Set state to returned data
        setRequestedData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setError(err);
      });
  };

  return { requestedData, loading, error };
}
