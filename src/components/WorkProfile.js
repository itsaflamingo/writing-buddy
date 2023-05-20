import { useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ActContext, CurrentActContext, CurrentProjectContext, ProjectContext } from '@/contexts/Contexts';
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

const filterDocuments = (collection, title) => collection.filter((doc) => doc.title === title)

export default function WorkProfile({ data, setData, section, changeSection }) {
  const { projects } = useContext(ProjectContext);
  const { currentProject } = useContext(CurrentProjectContext);

  const { acts } = useContext(ActContext);
  const { currentAct } = useContext(CurrentActContext);

  const { collection } = section;

  // Cache previous section.func value to prevent unnecessary re-renders
  const newSection = useMemo(() => calcSection(collection), [collection]);

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateAct, setShowCreateAct] = useState(false);
  const [showCreateChapter, setShowCreateChapter] = useState(false);
  const [editInput, setEditInput] = useState(null);

  const changeSectionHandler = (doc, collect) => {
    setData(null)
    if (!collect) {
      return changeSection({ id: doc.id, collection: newSection });
    }

    return changeSection({ id: doc.id, collection: collect });
  }

  const viewClickHandler = (e) => {
    e.stopPropagation();
    console.log('view');
  }

  const editClickHandler = (e) => {
    e.stopPropagation();
    const grandparentDiv = e.target.parentElement.parentElement;
    const title = grandparentDiv.querySelector('.doc-title');
    const titleText = title.innerText;

    let chosenDoc;

    switch (collection) {
      case 'projects':
        chosenDoc = filterDocuments(projects, titleText);
        setShowCreateProject(true);
        break;
      case 'acts':
        chosenDoc = filterDocuments(acts, titleText);
        break;
      default: chosenDoc = null;
    }
    setEditInput(chosenDoc[0]);
    return chosenDoc;
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
        {(collection === 'projects' || collection === 'acts') && (
        <button
          type="button"
          onClick={() => showNewDocumentDiv(collection)}
        >
          New
          {' '}
          {returnSingularCollection(collection)}
        </button>
        )}
        {collection === 'chapters' && (
        <h2>
          <Link href="/chapter/create">
            New
            {' '}
            {returnSingularCollection(collection)}
          </Link>
        </h2>
        )}
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
              <div className="doc-title">{doc.title}</div>
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
        editInput={editInput}
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
