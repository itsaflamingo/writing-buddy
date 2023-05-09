/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import useFetch from './useFetch';

export default function useFetchData({ id, token, func, data }) {
  const fetch = useFetch();

  const [requestedData, setRequestedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) return;
    setIsLoading(true);
    if (func === 'projects') {
      fetchData('user', 'projects');
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
      setRequestedData(res.data);
      setIsLoading(false);
    })
    .catch((err) => setError(err))

  return { requestedData, isLoading, error }
}
