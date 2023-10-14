import { useQuery } from 'react-query';
import React from 'react';
import axios from 'axios';
import { api_url } from '../api/url';
import Header from '../components/Header';
import background from '../images/homePageBackground.jpg'

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
        loading data...
      </div>
    );
  }

  const divStyle = {
    backgroundImage: `url(${background.src})`,
  };

  return (
    <div className="index h-full bg-no-repeat bg-cover" style={divStyle}>
      <Header />
      <div className="absolute top-0 left-0 h-[70px] w-screen opacity-20 bg-black" />
    </div>
  );
}
