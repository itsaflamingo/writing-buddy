import { useContext, useEffect, useMemo, useState } from 'react';
import { CurrentActContext, CurrentProjectContext, ProjectContext } from '@/contexts/Contexts';
import NavigationButton from './NavigationButton';
import returnSingularCollection from '@/functions/returnSingularCollection';
import NewProjectDiv from './NewProjectDiv';
import NewActDiv from './NewActDiv';

const calcSection = (section) => {
  let newSect;
  switch (section) {
    case 'projects':
      newSect = 'acts'
      break;
    case 'acts':
      newSect = 'chapters'
      break;
    default: newSect = section;
  }
  return newSect;
}

export default function WorkProfile({ data, setData, section, changeSection }) {
  const { projects } = useContext(ProjectContext);
  const { currentProject } = useContext(CurrentProjectContext);
  const { currentAct } = useContext(CurrentActContext);
  const { collection } = section;

  // Cache previous section.func value to prevent unnecessary re-renders
  const newSection = useMemo(() => calcSection(collection), [collection]);
  const [navButtons, setNavButtons] = useState(null);

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateAct, setShowCreateAct] = useState(false);
  const [showCreateChapter, setShowCreateChapter] = useState(false);

  const changeSectionHandler = (doc, collect) => {
    setData(null)
    if (!collect) {
      return changeSection({ id: doc.id, collection: newSection });
    }

    return changeSection({ id: doc.id, collection: collect });
  }

  useEffect(() => {
    setNavButtons()
  }, [])

  const viewClickHandler = (e) => {
    e.stopPropagation();
    console.log('view');
  }

  const editClickHandler = (e) => {
    e.stopPropagation();
    console.log('edit');
  }

  const deleteClickHandler = (e) => {
    e.stopPropagation();
    console.log('delete');
  }

  const showNewDocumentDiv = (collect) => {
    switch (collect) {
      case 'projects':
        setShowCreateProject(!showCreateProject)
        break;
      case 'acts':
        setShowCreateAct(!showCreateAct)
        break;
      case 'chapters':
        setShowCreateChapter(!showCreateChapter)
        break;
      default: return null
    }
  }

  return (
    <div className="work-profile">
      <div>
        {(collection === 'acts' && currentProject)
        && <NavigationButton document={currentProject[0]} changeSection={changeSectionHandler} section="acts" />}

        {(collection === 'chapters' && currentProject && currentAct)
        && (
        <>
          <NavigationButton document={currentProject[0]} changeSection={changeSectionHandler} section="acts" />
          <NavigationButton document={currentAct[0]} changeSection={changeSectionHandler} section="chapters" />
        </>
        )}
        <button
          type="button"
          onClick={() => showNewDocumentDiv(collection)}
        >
          New
          {' '}
          {returnSingularCollection(collection)}
        </button>
      </div>
      <div className="projects max-w-[800px] w-[600px] grid grid-cols-3 gap-[10px] border border-gray-300 p-[10px] m-[10px]">
        {data && data.map((doc) => (
          <button
            type="button"
            className="w-auto h-[200px] flex-col border border-gray-300"
            onClick={() => changeSectionHandler(doc)}
            disabled={collection === 'chapters'}
          >
            <div className="proj-info">
              <div>{doc.title}</div>
              <div>{doc.date_formatted}</div>
            </div>
            <div className="proj-buttons flex gap-2">
              <button type="button" className="border border-gray-300" onClick={(e) => viewClickHandler(e)}>View</button>
              <button type="button" className="border border-gray-300" onClick={(e) => editClickHandler(e)}>Edit</button>
              <button type="button" className="border border-gray-300" onClick={(e) => deleteClickHandler(e)}>Delete</button>
            </div>
          </button>
        ))}
      </div>
      {showCreateProject
      && (
      <NewProjectDiv
        refreshSection={changeSectionHandler}
        collection={collection}
        setShowCreateProject={setShowCreateProject}
      />
      )}
      {showCreateAct && (
      <NewActDiv
        refreshSection={changeSectionHandler}
        collection={collection}
        setShowCreateProject={setShowCreateAct}
      />
      )}
    </div>
  )
}
