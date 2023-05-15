/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import NewProjectDiv from './NewProjectDiv';
import NewActDiv from './NewActDiv';

export default function Menu({ changeSection, id }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateAct, setShowCreateAct] = useState(false);
  const [showCreateChapter, setShowCreateChapter] = useState(false);

  const [allOptions, setAllOptions] = useState(['Project', 'Act', 'Chapter']);
  const [selectedOption, setSelectedOption] = useState('Select...');

  const showNewSection = () => changeSection({ id, func: 'projects' })

  useEffect(() => {
    switch (selectedOption) {
      case 'Project':
        setShowCreateProject(!showCreateProject)
        break;
      case 'Act':
        setShowCreateAct(!showCreateAct)
        break;
      case 'Chapter':
        setShowCreateChapter(!showCreateChapter)
        break;
      default: setShowDropdown(!showDropdown)
    }
  }, [selectedOption])

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
        onClick={() => setShowDropdown(!showDropdown)}
      >
        New
      </button>
      { showCreateProject && <NewProjectDiv /> }
      { showCreateAct && <NewActDiv />}
    </div>
  )
}
