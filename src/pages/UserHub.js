import { useContext, useEffect, useState } from 'react';
import Menu from './Menu';
import { UserContext } from '@/contexts/Contexts';
import WorkProfile from './WorkProfile';
import useFetchData from '@/customHooks/useFetchData';

const sendToFetchData = (user, func, data) => {
  const id = user.user._id;
  const token = user.token;

  return { id, token, func, data }
}

export default function UserHub() {
  // Get UserContext
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [section, setSection] = useState('projects');
  const params = sendToFetchData(user, section, data);
  const { requestedData, isLoading, error } = useFetchData(params);

  useEffect(() => {
    if (isLoading === true || data) return;
    setData(requestedData)
  }, [requestedData])

  return (
    <div className="flex">
      <Menu />
      {error && <div>{error}</div>}
      <div className="flex flex-col">
      Projects
      {data && <WorkProfile data={data} setData={setData} />}
      {isLoading && <div>Loading...</div>}
      </div>
    </div>
  )
}
