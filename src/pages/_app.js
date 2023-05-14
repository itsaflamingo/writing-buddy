import '@/styles/globals.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import React, { useState } from 'react';
import axios from 'axios';
import { api_url } from '@/api/url';
import { ActContext, ProjectContext, UserContext } from '@/contexts/Contexts';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);
  const [acts, setActs] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <ProjectContext.Provider value={{ projects, setProjects }}>
          <ActContext.Provider value={{ acts, setActs }}>
            <Component {...pageProps} />
          </ActContext.Provider>
        </ProjectContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  )
}
