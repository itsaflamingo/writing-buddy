/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import NewProjectDiv from './NewProjectDiv';

export default function Menu({ changeSection, id }) {
  const [showCreateProject, setShowCreateProject] = useState(false);

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
