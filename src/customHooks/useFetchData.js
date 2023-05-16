/* eslint-disable consistent-return */
import { useState, useEffect, useContext } from 'react';
import useFetch from './useFetch';
import { ActContext, CurrentActContext, CurrentProjectContext, ProjectContext } from '@/contexts/Contexts';

export default function useFetchData({ id, token, collection, data }) {
  const fetch = useFetch();
  const { projects, setProjects } = useContext(ProjectContext);
  const { acts, setActs } = useContext(ActContext);
  const { setCurrentProject } = useContext(CurrentProjectContext);
  const { setCurrentAct } = useContext(CurrentActContext);

  const [requestedData, setRequestedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) return;
    setLoading(true);
    if (collection === 'projects') {
      // If projects context is empty, get new data, and use it to populate projects
      // If projects context not empty, simply rerturn projects context data
      if (projects === null) {
        // Get data, set state to returned data
        fetchData('user', 'projects');
        setProjects(requestedData);
      }
      setRequestedData(projects);
      setLoading(false);
    }
    if (collection === 'acts') {
      // Get data, set state to returned data
      fetchData('project', 'acts');
      // Set acts context to returned data
      setActs(requestedData);
      // Set current project context to project connected to acts
      setCurrentProject(() => projects.filter((project) => project._id === id));
    }
    if (collection === 'chapters') {
      // Get data, set state to returned data
      fetchData('act', 'chapters');
      // Set current act context to act connected to chapters
      setCurrentAct(() => acts.filter((act) => act._id === id));
    }

    return (() => setRequestedData(null))
  }, [requestedData, data, collection])

  const fetchData = (pathOne, pathTwo) => fetch.getData(`/hub/${pathOne}/${id}/${pathTwo}`, token)
    .then((res) => {
      // Set state to returned data
      setRequestedData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log('error', err)
      setError(err)
    })

  return { requestedData, loading, error }
}
