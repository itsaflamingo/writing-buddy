import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useState } from 'react';
import { ActContext, ChapterContext, CurrentActContext, CurrentChapterContext, CurrentProjectContext, ProjectContext, UserContext } from '@/contexts/Contexts';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState(null);
  const [acts, setActs] = useState(null);
  const [chapters, setChapters] = useState(null);

  const [currentProject, setCurrentProject] = useState(null);
  const [currentAct, setCurrentAct] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <ProjectContext.Provider value={{ projects, setProjects }}>
          <ActContext.Provider value={{ acts, setActs }}>
            <ChapterContext.Provider value={{ chapters, setChapters }}>
              <CurrentProjectContext.Provider value={{ currentProject, setCurrentProject }}>
                <CurrentActContext.Provider value={{ currentAct, setCurrentAct }}>
                  <CurrentChapterContext.Provider value={{ currentChapter, setCurrentChapter }}>
                    <Component {...pageProps} />
                  </CurrentChapterContext.Provider>
                </CurrentActContext.Provider>
              </CurrentProjectContext.Provider>
            </ChapterContext.Provider>
          </ActContext.Provider>
        </ProjectContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  )
}
