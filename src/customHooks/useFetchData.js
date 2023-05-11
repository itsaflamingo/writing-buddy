/* eslint-disable consistent-return */
import { useState, useEffect, useContext } from 'react';
import useFetch from './useFetch';
import { ProjectContext } from '@/contexts/Contexts';

export default function useFetchData({ id, token, func, data }) {
  const fetch = useFetch();
  const { projects } = useContext(ProjectContext);

  const [requestedData, setRequestedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) return;
    setIsLoading(true);
    if (func === 'projects') {
      if (projects === null) {
        fetchData('user', 'projects');
      }
      setRequestedData(projects);
    }
    if (func === 'acts') {
      fetchData('project', 'acts');
    }
    if (func === 'chapters') {
      fetchData('act', 'chapters');
    }

    return (() => setRequestedData(null))
  }, [requestedData, data])

  const fetchData = (pathOne, pathTwo) => fetch.getData(`/hub/${pathOne}/${id}/${pathTwo}`, token)
    .then((res) => {
      console.log(res);
      setRequestedData(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log('error', err)
      setError(err)
    })

  return { requestedData, isLoading, error }
}
