import { useQuery } from 'react-query';
import React, { useContext, useMemo, useState } from 'react';
import axios from 'axios';
import { api_url } from './api/url';
import Header from './Header';
import { UserContext } from '../contexts/Contexts';
import UserHub from './UserHub';

export default function Home() {
  const [user, setUser] = useState(null);
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
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        { user && <UserHub /> }
      </UserContext.Provider>
    </div>
  );
}
