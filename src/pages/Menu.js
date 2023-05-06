/* eslint-disable no-underscore-dangle */
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/Contexts';
import useFetch from '@/customHooks/useFetch';
import NewProjectDiv from './NewProjectDiv';
import WorkProfile from './WorkProfile';

export default function Menu() {
  const fetch = useFetch();
  const user = useContext(UserContext);

  const [data, setData] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);

  const fetchData = () => {
    fetch.getData(`/hub/user/${user.user.user._id}/projects`, user.user.token)
      .then((res) => setWorks(res.data))
      .catch((err) => err)
  }

  return (
    <div className="menu container max-w-[130px] flex flex-col ">
      <button
        type="button"
        className="hover:bg-sky-700 max-w-fit"
        onClick={() => setData(fetchData())}
      >
        Projects
      </button>
      <button
        type="button"
        className="hover:bg-sky-700 max-w-fit"
        onClick={() => setShowCreateProject(!showCreateProject)}
      >
        New Project
      </button>
      { showCreateProject && <NewProjectDiv /> }
      <WorkProfile data={data} />
      { (data && data.length === 0) && <h1>You don&apos;t have any projects</h1> }
    </div>
  )
}
