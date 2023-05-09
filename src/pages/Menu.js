/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/Contexts';
import useFetch from '@/customHooks/useFetch';
import NewProjectDiv from './NewProjectDiv';
import WorkProfile from './WorkProfile';

export default function Menu({ section, changeSection, id }) {
  const [showCreateProject, setShowCreateProject] = useState(false);

  console.log(id);
  const showNewSection = () => changeSection({ id, func: 'projects' })

  return (
    <div className="menu container max-w-[130px] flex flex-col ">
      <button
        type="button"
        className="hover:bg-sky-700 max-w-fit"
        onClick={() => showNewSection()}
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
    </div>
  )
}
