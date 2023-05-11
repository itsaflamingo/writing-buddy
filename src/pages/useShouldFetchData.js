import { useContext } from 'react';
import { ActContext, ProjectContext } from '@/contexts/Contexts';
import useFetchData from '@/customHooks/useFetchData';

const sendToFetchData = (token, section, data) => {
  const { id, func } = section;
  return { id, token, func, data }
}

export default function useShouldFetchData(section, token, data) {
  const { projects } = useContext(ProjectContext);
  const { acts } = useContext(ActContext);

  if (data) {
    return { requestedData: data, isLoading: false, error: null }
  }

  // Prepares data into object
  const params = sendToFetchData(token, { id: section.id, func: section.func }, data);

  let requestedData, isLoading, error;

  if (projects && params.func === 'projects') {
    requestedData = projects;
    isLoading = null;
    error = null;
  } else if (acts && params.func === 'acts') {
    requestedData = acts;
    isLoading = null;
    error = null;
  } else {
    ({ requestedData, isLoading, error } = useFetchData(params));
  }

  return { requestedData, isLoading, error };
}
