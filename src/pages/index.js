import { useQuery } from 'react-query';
import React from 'react';
import axios from 'axios';
import { api_url } from './api/url';
import Header from './Header';

export default function Home() {
  const result = useQuery(
    'user',
    () => axios.get(`${api_url}/`)
      .then((res) => res)
      .catch((err) => err),
  );
  if (result.isLoading) {
    return (
      <div>
        <Header />
        loading data...
      </div>
    );
  }
  const user = result.data;

  return (
    <div>
      <Header />
      {user.request.response}
    </div>
  );
}
