/* eslint-disable arrow-body-style */
import axios from "axios";
import { useCallback, useState } from "react";
import { api_url } from "@/api/url";

export default function useFetch() {
  const [error, setError] = useState(null);

  const createData = useCallback((route, data, token) => {
    const formData = new URLSearchParams(data).toString();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    };

    return axios
      .post(`${api_url}${route}`, formData, { headers })
      .then((res) => {
        console.log(`${api_url}${route}`, formData, { headers });
        console.log("RESPONSE: ", res);
        return res;
      })
      .catch((err) => {
        console.log(`${api_url}${route}`, formData, { headers });
        setError(err);
      });
  });

  const getData = useCallback((route, token) => {
    const headers = { Authorization: `Bearer ${token}` };

    return axios
      .get(`${api_url}${route}`, { headers })
      .then((res) => res)
      .catch((err) => setError(err));
  });

  const updateData = useCallback((route, data, token) => {
    const formData = new URLSearchParams(data).toString();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    };

    return axios
      .patch(`${api_url}${route}`, formData, { headers })
      .then((res) => res)
      .catch((err) => setError(err));
  });

  const deleteData = useCallback((route, token) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    };

    return axios
      .delete(`${api_url}${route}`, { headers })
      .then((res) => console.log(res))
      .catch((err) => setError(err));
  });

  return { createData, getData, updateData, deleteData, error };
}
