/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback } from 'react';
import { api_url } from '@/pages/api/url';

export default function useFetch() {
  const createData = useCallback((route, data, token) => {
    const formData = new URLSearchParams(data).toString();
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    }

    return axios.post(`${api_url}${route}`, formData, { headers })
      .then((res) => res)
      .catch((err) => err)
  })

  const getData = useCallback((route, token) => {
    const headers = { Authorization: `Bearer ${token}` }

    return axios.get(`${api_url}${route}`, { headers })
      .then((res) => res)
      .catch((err) => err)
  })

  return { createData, getData }
}
