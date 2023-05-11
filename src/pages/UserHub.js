import { useContext, useEffect, useState } from 'react';
import Menu from './Menu';
import { ActContext, ProjectContext, UserContext } from '@/contexts/Contexts';
import WorkProfile from './WorkProfile';
import useFetchData from '@/customHooks/useFetchData';

const sendToFetchData = (token, section, data) => {
  const { id, func } = section;
  return { id, token, func, data }
}

export default function UserHub() {
  const { user } = useContext(UserContext);
  const id = user.user._id;
  const { token } = user;
  // Array of objects returned from the requested data
  const [data, setData] = useState(null);
  // Use above information to get data from backend
  const [section, setSection] = useState({ id, func: 'projects' });

  // Prepares data into object
  const params = sendToFetchData(token, { id: section.id, func: section.func }, data);

  const { requestedData, isLoading, error } = useFetchData(params);

  useEffect(() => {
    // When data is successfully retrieved from backend, add to data state
    if (isLoading === true || data) return;
    setData(requestedData);
  }, [requestedData])

  useEffect(() => {
    // When section is changed, reset data value to enable retrieval of new data
    setData(null);
  }, [section])

  return (
    <div className="flex">
      {error && <div>{error}</div>}
      <div className="flex flex-col">
        {section.func.toUpperCase()}
        {error}
        {data
          && (
          <WorkProfile
            data={data}
            setData={setData}
            changeSection={setSection}
            section={section}
          />
          )}
        {isLoading && <div>Loading...</div>}
        { (data && data.length === 0) && (
        <h1>
          You don&apos;t have any
          {' '}
          {section.func}
        </h1>
        ) }
      </div>
      <Menu changeSection={setSection} id={id} />
    </div>
  )
}
