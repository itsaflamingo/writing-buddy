/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import NewProjectDiv from './NewProjectDiv';

export default function Menu({ id }) {
  const [showCreateProject, setShowCreateProject] = useState(false);

  return (
    <div className="menu container max-w-[130px] flex flex-col ">
      <button
        type="button"
        className="hover:bg-sky-700 max-w-fit"
        onClick={() => setShowCreateProject(!showCreateProject)}
      >
        Projects
      </button>
      New
      { showCreateProject && <NewProjectDiv /> }
    </div>
  )
}
