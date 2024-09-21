/* eslint-disable arrow-body-style */
import axios from "axios";
import { useCallback, useState } from "react";
import { api_url } from "@/api/url";

export default function useFetch(token) {
  const [error, setError] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const createData = useCallback((route, data) => {
    return axios
      .post(`${api_url}${route}`, data, { headers })
      .then((res) => res)
      .catch((err) => setError(err));
  });

  const getData = useCallback((route) => {
    const headers = { Authorization: `Bearer ${token}` };

    return axios
      .get(`${api_url}${route}`, { headers })
      .then((res) => res)
      .catch((err) => setError(err));
  });

  const updateData = useCallback((route, data) => {
    return axios
      .patch(`${api_url}${route}`, data, { headers })
      .then((res) => res)
      .catch((err) => setError(err));
  });

  const deleteData = useCallback((route) => {
    return axios
      .delete(`${api_url}${route}`, { headers })
      .then((res) => res)
      .catch((err) => setError(err));
  });

  return { createData, getData, updateData, deleteData, error };
}
