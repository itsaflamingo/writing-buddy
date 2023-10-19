import React, { useContext, useEffect, useMemo, useState } from 'react';
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

  const { userData } = useContext(UserContext);
  const { user } = userData;
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

    if (newSection === 'projects') {
      return changeSection({ id: doc.id, collection: 'projects' })
    }
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

  const getParentDocumentAndCollection = (collect) => {
    let parentCollection = null;
    let parentDocument = null;

    switch (collect) {
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

  // changes docToDeleteTitle state to title of selected div
  const deleteClickHandler = (e) => {
    e.stopPropagation();
    setDocToDeleteTitle(getSelectedDivTitle(e));
  }

  // Called when delete is confirmed from ConfirmDelete component
  const deleteDocument = (title) => {
    const document = getSelectedDoc(title, sectionData);

    let { parentCollection, parentDocument } = getParentDocumentAndCollection(collection);

    if (!parentCollection && !parentDocument) {
      parentCollection = 'projects';
      parentDocument = document;
    }

    const abbreviatedCollection = collection.slice(0, collection.length - 1);

    console.log(document);
    console.log(`/hub/${abbreviatedCollection}/${document.id}/delete`)

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
    <div className="work-profile">
      <div className="flex mt-[10px]">
        <NavigationButton document={user.user} changeSection={changeSectionHandler} section="projects" />
        {(collection === 'acts' && currentProject)
        && (
        <NavigationButton document={currentProject[0]} changeSection={changeSectionHandler} section="projects" />
        )}

        {(collection === 'chapters' && currentProject && currentAct)
        && (
        <>
          <NavigationButton document={currentProject[0]} changeSection={changeSectionHandler} section="acts" />
          <div className="flex items-center h-[17.6px] mx-[10px]">&gt;</div>
          <NavigationButton document={currentAct[0]} changeSection={changeSectionHandler} section="chapters" />
        </>
        )}
      </div>
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
      <div>
        {collection === 'chapters' && (
          <h2 className="flex justify-center items-center border border-solid w-40 font-medium m-[10px]">
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
          <div className="relative flex flex-col justify-center w-auto h-[200px]">
            <button
              key={uniqid()}
              type="button"
              className="absolute flex flex-col justify-center w-full h-[200px] border border-gray-300"
              style={{ zIndex: 1 }}
              onClick={() => changeSectionHandler(doc)}
              disabled={collection === 'chapters'}
            />
            <div className="proj-info flex flex-col items-center w-full">
              <div className="text-lg doc-title">{doc.title}</div>
              <div className="flex text-xs">
                on
                {' '}
                {doc.date_formatted}
              </div>
            </div>
            <div className="proj-buttons flex justify-center w-full gap-2 mt-24">
              <button type="button" onClick={(e) => viewClickHandler(e)} style={{ zIndex: 2 }}>
                <img src={view.src} alt="view" className="max-h-[25px]" />
              </button>
              <button type="button" onClick={(e) => editClickHandler(e)} style={{ zIndex: 2 }}>
                <img src={edit.src} alt="edit" className="max-h-[25px]" />
              </button>
              <button type="button" onClick={(e) => deleteClickHandler(e)} style={{ zIndex: 2 }}>
                <img src={del.src} alt="delete" className="max-h-[25px]" />
              </button>
            </div>
          </div>
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
