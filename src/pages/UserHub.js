import { useContext, useEffect, useState } from 'react';
import Menu from './Menu';
import { UserContext } from '@/contexts/Contexts';
import WorkProfile from './WorkProfile';
import useFetchData from '@/customHooks/useFetchData';

const sendToFetchData = (token, section, data) => {
  const { id, func } = section;

  return { id, token, func, data }
}

export default function UserHub() {
  // Get UserContext
  const { user } = useContext(UserContext);
  const id = user.user._id;
  const { token } = user;

  const [data, setData] = useState(null);
  const [section, setSection] = useState({ id, func: 'projects' });
  const params = sendToFetchData(token, { id: section.id, func: section.func }, data);
  const { requestedData, isLoading, error } = useFetchData(params);

  useEffect(() => {
    if (isLoading === true || data) return;
    setData(requestedData)
  }, [requestedData])

  useEffect(() => {
    setData(null);
  }, [section])

  console.log(data);

  return (
    <div className="flex">
      <Menu section={section} changeSection={setSection} id={id} />
      {error && <div>{error}</div>}
      <div className="flex flex-col">
        {section.func.toUpperCase()}
        {data && <WorkProfile data={data} setData={setData} changeSection={setSection} section={section} />}
        {isLoading && <div>Loading...</div>}
        { (data && data.length === 0) && (
        <h1>
          You don&apos;t have any
          {' '}
          {section.func}
        </h1>
        ) }
      </div>
    </div>
  )
}
