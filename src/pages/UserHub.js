import { useContext, useEffect, useState } from 'react';
import Menu from './Menu';
import { UserContext } from '@/contexts/Contexts';
import useFetch from '@/customHooks/useFetch';
import WorkProfile from './WorkProfile';
import useFetchData from '@/customHooks/useFetchData';

export default function UserHub() {
  // Get UserContext
  const user = useContext(UserContext);
  const { requestedData, isLoading, error } = useFetchData(user.user.user._id, user.user.token, 'projects');
  const [data, setData] = useState(isLoading ? null : requestedData);

  console.log(data, error);

  return (
    <div>
      <Menu />
      {error && <div>{error}</div>}
      {data && <WorkProfile data={data} setData={setData} />}
      {isLoading && <div>Loading...</div>}
    </div>
  )
}
