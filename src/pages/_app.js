import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useState } from 'react';
import { ActContext, CurrentActContext, CurrentProjectContext, ProjectContext, UserContext } from '@/contexts/Contexts';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);
  const [acts, setActs] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentAct, setCurrentAct] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <ProjectContext.Provider value={{ projects, setProjects }}>
          <ActContext.Provider value={{ acts, setActs }}>
            <CurrentProjectContext.Provider value={{ currentProject, setCurrentProject }}>
              <CurrentActContext.Provider value={{ currentAct, setCurrentAct }}>
                <Component {...pageProps} />
              </CurrentActContext.Provider>
            </CurrentProjectContext.Provider>
          </ActContext.Provider>
        </ProjectContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  )
}
