import { useQuery } from 'react-query';
import React, { useContext } from 'react';
import axios from 'axios';
import { api_url } from '../api/url';
import Header from '../components/Header';
import { UserContext } from '../contexts/Contexts';
import UserHub from '../components/UserHub';

export default function Home() {
  const { user } = useContext(UserContext);

  const result = useQuery(
    'user',
    () => axios.get(`${api_url}/`)
      .then((res) => res)
      .catch((err) => err),
  );

  if (result.isLoading) {
    return (
      <div>
        loading data...
      </div>
    );
  }

  return (
    <div className="index">
      <Header />
      { user && <UserHub /> }
    </div>
  );
}
