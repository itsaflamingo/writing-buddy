/* eslint-disable arrow-body-style */
import axios from "axios";
import { useCallback, useState } from "react";
import { api_url } from "@/api/url";

export default function useFetch(token) {
  const [error, setError] = useState(null);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
  };

  const createData = useCallback((route, data) => {
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(`${api_url}${route}`, formData, { headers })
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
    const formData = new URLSearchParams(data).toString();
    return axios
      .patch(`${api_url}${route}`, formData, { headers })
      .then((res) => res)
      .catch((err) => setError(err));
  });

  const deleteData = useCallback((route) => {
    return axios
      .delete(`${api_url}${route}`, { headers })
      .then((res) => console.log(res))
      .catch((err) => setError(err));
  });

  return { createData, getData, updateData, deleteData, error };
}
