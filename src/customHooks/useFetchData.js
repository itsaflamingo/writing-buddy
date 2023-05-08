/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import useFetch from './useFetch';

export default function useFetchData({ id, token, func, data }) {
  console.log(id, token, func, data)
  const fetch = useFetch();

  const [requestedData, setRequestedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (requestedData || data) return;
    setIsLoading(true);
    if (func === 'projects') {
      fetchProjects();
    }
    if (func === 'acts') {
      fetchActs();
    }
    if (func === 'chapters') {
      fetchChapters();
    }

    return (() => setRequestedData(null))
  }, [requestedData])

  const fetchProjects = () => fetch.getData(`/hub/user/${id}/projects`, token)
    .then((res) => {
      setRequestedData(res.data);
      setIsLoading(false);
    })
    .catch((err) => setError(err))

  const fetchActs = () => fetch.getData(`/hub/project/${id}/acts`, token)
    .then((res) => {
      setRequestedData(res.data);
      setIsLoading(false);
    })
    .catch((err) => setError(err))

  const fetchChapters = () => fetch.getData(`/hub/act/${id}/chapters`, token)
    .then((res) => {
      setRequestedData(res.data);
      setIsLoading(false);
    })
    .catch((err) => setError(err))

  return { requestedData, isLoading, error }
}
