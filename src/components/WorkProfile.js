import { useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import uniqid from 'uniqid';
import { ActContext, ChapterContext, CurrentActContext, CurrentChapterContext, CurrentProjectContext, ProjectContext, UserContext } from '@/contexts/Contexts';
import NavigationButton from './NavigationButton';
import returnSingularCollection from '@/functions/returnSingularCollection';
import NewProjectDiv from './NewProjectDiv';
import NewActDiv from './NewActDiv';
import useFetch from '@/customHooks/useFetch';
import ConfirmDelete from './ConfirmDelete';
import { getSelectedDivTitle, getSelectedDoc } from '@/functions/getSelectedDocument';
import view from '../images/view-black.png';
import edit from '../images/edit-black.png';
import del from '../images/delete-black.png';

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
  const router = useRouter();
  const fetch = useFetch();

  const { user } = useContext(UserContext);
  const { token } = user;

  const { projects } = useContext(ProjectContext);
  const { acts } = useContext(ActContext);
  const { chapters } = useContext(ChapterContext);

  const { currentAct } = useContext(CurrentActContext);
  const { currentProject } = useContext(CurrentProjectContext);
  const { setCurrentChapter } = useContext(CurrentChapterContext);

  const { collection } = section;

  // Cache previous section.func value to prevent unnecessary re-renders
  const newSection = useMemo(() => calcSection(collection), [collection]);

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateAct, setShowCreateAct] = useState(false);
  const [editInput, setEditInput] = useState(null);
  const [docToDeleteTitle, setDocToDeleteTitle] = useState(null);
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    switch (collection) {
      case 'projects':
        setSectionData(projects);
        break;
      case 'acts':
        setSectionData(acts);
        break;
      case 'chapters':
        setSectionData(chapters);
        break;
      default: return null;
    }
  }, []);

  const changeSectionHandler = (doc, collect) => {
    setData(null)
    if (!collect) {
      return changeSection({ id: doc.id, collection: newSection });
    }

    return changeSection({ id: doc.id, collection: collect });
  }

  const navigateToChapterRoute = (doc, endpoint) => {
    router.push({
      pathname: `/chapter/${endpoint}`,
      query: { data: JSON.stringify(doc) },
    });
  }

  const viewClickHandler = (e) => {
    e.stopPropagation();
    const title = getSelectedDivTitle(e);
    const doc = getSelectedDoc(title, sectionData);
    setCurrentChapter(doc);

    router.push({
      pathname: '/chapter/view',
    });
  }

  const editClickHandler = (e) => {
    e.stopPropagation();

    const title = getSelectedDivTitle(e);
    const document = getSelectedDoc(title, sectionData);

    switch (collection) {
      case 'projects':
        setShowCreateProject(true);
        break;
      case 'acts':
        setShowCreateAct(true);
        break;
      case 'chapters':
        navigateToChapterRoute(document, 'create');
        break;
      default: return document;
    }

    return document;
  }

  const getParentDocumentAndCollection = (collection) => {
    let parentCollection = null;
    let parentDocument = null;

    switch (collection) {
      case 'acts':
        parentCollection = 'projects';
        parentDocument = currentProject[0];
        break;
      case 'chapters':
        if (chapters.length === 1) {
          parentCollection = 'acts';
          // Also currentProject because page wants id of project with act children
          parentDocument = currentProject[0];
        } else {
          parentCollection = 'chapters';
          parentDocument = currentAct[0]
        }
        break;
      default: parentCollection = null;
    }
    return { parentCollection, parentDocument };
  }

  const deleteClickHandler = (e) => {
    e.stopPropagation();
    setDocToDeleteTitle(getSelectedDivTitle(e));
  }

  const deleteDocument = (title) => {
    const document = getSelectedDoc(title, sectionData);
    const { parentCollection, parentDocument } = getParentDocumentAndCollection(collection);
    const abbreviatedCollection = collection.slice(0, collection.length - 1);

    changeSectionHandler(parentDocument, parentCollection);
    fetch.deleteData(`/hub/${abbreviatedCollection}/${document.id}/delete`, token)
      .then(() => changeSectionHandler(user.user._id, 'projects'))
      .catch((err) => console.log(err))
  }

  const showNewDocumentDiv = (collect) => {
    switch (collect) {
      case 'projects':
        setShowCreateProject(!showCreateProject)
        break;
      case 'acts':
        setShowCreateAct(!showCreateAct)
        break;
      default: return null
    }
  }

  return (
    <div className="work-profile ">
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
          className="flex justify-center items-center border border-solid w-40 font-medium m-[10px]"
        >
          New
          {' '}
          {returnSingularCollection(collection)}
        </button>
        )}
        {collection === 'chapters' && (
        <h2>
          <Link
            href={{
              pathname: '/chapter/create',
              query: { editInput },
            }}
          >
            New
            {' '}
            {returnSingularCollection(collection)}
          </Link>
        </h2>
        )}
      </div>
      <div className="max-w-[800px] w-[600px] grid grid-cols-3 gap-[10px] border border-gray-300 p-[10px] m-[10px]">
        {data && data.map((doc) => (
          <button
            key={uniqid()}
            type="button"
            className="w-auto h-[200px] flex-col border border-gray-300"
            onClick={() => changeSectionHandler(doc)}
            disabled={collection === 'chapters'}
          >
            <div className="proj-info flex flex-col gap-28">
              <div className="doc-title">{doc.title}</div>
              <div className="flex">{doc.date_formatted}</div>
            </div>
            <div className="proj-buttons flex gap-2">
              <button type="button" className="border border-gray-300" onClick={(e) => viewClickHandler(e)}>
                <img src={view.src} alt="view" className="max-h-[30px]" />
              </button>
              <button type="button" className="border border-gray-300" onClick={(e) => editClickHandler(e)}>
              <img src={edit.src} alt="edit" className="max-h-[30px]" />
              </button>
              <button type="button" className="border border-gray-300" onClick={(e) => deleteClickHandler(e)}>
                <img src={del.src} alt="delete" className="max-h-[30px]" />
              </button>
            </div>
          </button>
        ))}
      </div>
      {docToDeleteTitle
      && (
      <ConfirmDelete
        title={docToDeleteTitle}
        deleteDocument={deleteDocument}
        setDocToDeleteTitle={setDocToDeleteTitle}
      />
      )}
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
        editInput={editInput}
        refreshSection={changeSectionHandler}
        collection={collection}
        setShowCreateAct={setShowCreateAct}
      />
      )}
    </div>
  )
}
