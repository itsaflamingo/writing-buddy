import { useQuery } from 'react-query';
import React from 'react';
import axios from 'axios';

export default function Home() {
  console.log('index.js runs');

  const result = useQuery(
    'user',
    () => axios.get(`${process.env.HOST}/user`)
      .then((res) => res)
      .catch((err) => err),
  );
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const user = result.data;
  console.log(user);

  return (
    <div>{user.request.response}</div>
  );
}
