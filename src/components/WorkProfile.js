import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import uniqid from "uniqid";
import {
  ActContext,
  ChapterContext,
  CurrentActContext,
  CurrentChapterContext,
  CurrentProjectContext,
  ProjectContext,
  UserContext,
} from "@/contexts/Contexts";
import NavigationButton from "./NavigationButton";
import returnSingularCollection from "@/functions/returnSingularCollection";
import NewProjectDiv from "./NewProjectDiv";
import NewActDiv from "./NewActDiv";
import useFetch from "@/customHooks/useFetch";
import ConfirmDelete from "./ConfirmDelete";
import {
  getSelectedDivTitle,
  getSelectedDoc,
} from "@/functions/getSelectedDocument";
import view from "../images/view-black.png";
import edit from "../images/edit-black.png";
import del from "../images/delete-black.png";
import getParentDocumentAndCollection from "@/functions/getParentDocumentAndCollection";
import capitalizeStr from "@/functions/capitalizeStr";
import ContributionGraph from "./ContributionGraph";
import FileOptions from "./FileOptions";

const calcSection = (section) => {
  let newSect;
  switch (section) {
    case "projects":
      newSect = "acts";
      break;
    case "acts":
      newSect = "chapters";
      break;
    default:
      newSect = section;
  }
  return newSect;
};

export default function WorkProfile({ data, setData, section, changeSection }) {
  const router = useRouter();

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

  const fetch = useFetch(token);

  // Cache previous section.func value to prevent unnecessary re-renders
  const newSection = useMemo(() => calcSection(collection), [collection]);

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateAct, setShowCreateAct] = useState(false);
  const [editInput, setEditInput] = useState(null);
  const [docToDeleteTitle, setDocToDeleteTitle] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    switch (collection) {
      case "projects":
        setSectionData(projects);
        break;
      case "acts":
        setSectionData(acts);
        break;
      case "chapters":
        setSectionData(chapters);
        break;
      default:
        return null;
    }
  }, []);

  const changeSectionHandler = (doc, collect) => {
    setData(null);

    if (newSection === "projects") {
      return changeSection({ id: doc.id, collection: "projects" });
    }
    if (!collect) {
      return changeSection({ id: doc.id, collection: newSection });
    }

    return changeSection({ id: doc.id, collection: collect });
  };

  const navigateToChapterRoute = (doc, endpoint) => {
    router.push({
      pathname: `/chapter/${endpoint}`,
      query: { data: JSON.stringify(doc) },
    });
  };

  const viewClickHandler = (e) => {
    e.stopPropagation();
    const title = getSelectedDivTitle(e).toLowerCase();
    const doc = getSelectedDoc(title, sectionData);
    setCurrentChapter(doc);

    router.push({
      pathname: "/chapter/view",
    });
  };

  const editClickHandler = (e) => {
    e.stopPropagation();

    const title = getSelectedDivTitle(e);
    const lowerCaseTitle = title.toLowerCase();
    const document = getSelectedDoc(lowerCaseTitle, sectionData);

    switch (collection) {
      case "projects":
        setShowCreateProject(true);
        break;
      case "acts":
        setShowCreateAct(true);
        break;
      case "chapters":
        navigateToChapterRoute(document, "create");
        break;
      default:
        return document;
    }

    setEditInput({
      title: title,
      genre: document.genre,
      isPublished: document.isPublished,
      isComplete: document.isComplete,
      id: document.id,
      url: document.url,
      list_acts: document.list_acts,
    });

    return document;
  };

  function deleteProject(collect, document) {
    let index;

    if (collect === "projects") {
      index = projects.findIndex((act) => act.title === document.title);
      projects.splice(index, 1);
    }
  }

  // changes docToDeleteTitle state to title of selected div
  const deleteClickHandler = (e) => {
    e.stopPropagation();
    setDocToDeleteTitle(getSelectedDivTitle(e).toLowerCase());
  };

  // Called when delete is confirmed from ConfirmDelete component
  const deleteDocument = (title) => {
    // Select document to be deleted
    const document = getSelectedDoc(title, sectionData);

    // Select collection that document belongs in
    let { parentCollection, parentDocument } = getParentDocumentAndCollection(
      collection,
      currentProject,
      currentAct
    );

    if (!parentCollection && !parentDocument) {
      parentCollection = "projects";
      parentDocument = document;
    }

    changeSectionHandler(parentDocument, parentCollection);

    fetch
      .deleteData(document.url)
      .then(() => {
        deleteProject(collection, document);
        changeSectionHandler(user.user._id, "projects");
      })
      .catch((err) => console.log(err));
  };

  const showNewDocumentDiv = (collect) => {
    switch (collect) {
      case "projects":
        setShowCreateProject(!showCreateProject);
        break;
      case "acts":
        setShowCreateAct(!showCreateAct);
        break;
      default:
        return null;
    }
  };

  const targetCorrectButton = (doc) => {
    if (showOptions !== false) return setShowOptions(false);
    setShowOptions(doc.id);
  };

  return (
    <div className="work-profile">
      <div className="flex mt-[10px]">
        {/* NAV BUTTONS */}
        {"user" in user && (
          <NavigationButton
            document={user.user}
            changeSection={changeSectionHandler}
            section="projects"
          />
        )}
        {collection === "acts" && currentProject && (
          <NavigationButton
            document={currentProject[0]}
            changeSection={changeSectionHandler}
            section="projects"
          />
        )}

        {collection === "chapters" && currentProject && currentAct && (
          <>
            <NavigationButton
              document={currentProject[0]}
              changeSection={changeSectionHandler}
              section="acts"
            />
            <div className="flex items-center h-[17.6px] mx-[10px]">&gt;</div>
            <NavigationButton
              document={currentAct[0]}
              changeSection={changeSectionHandler}
              section="chapters"
            />
          </>
        )}
      </div>
      {/* NEW DOCUMENT DIVS */}
      {(collection === "projects" || collection === "acts") && (
        <button
          type="button"
          onClick={() => showNewDocumentDiv(collection)}
          className="flex justify-center items-center border border-solid w-40 font-medium m-[10px] rounded-lg"
        >
          New {returnSingularCollection(collection)}
        </button>
      )}
      <div>
        {collection === "chapters" && (
          <h2 className="flex justify-center items-center border border-solid w-40 font-medium m-[10px]">
            <Link
              href={{
                pathname: "/chapter/create",
                query: { editInput },
              }}
            >
              New {returnSingularCollection(collection)}
            </Link>
          </h2>
        )}
      </div>
      <div className="max-w-[900px] grid grid-cols-3 gap-[10px] border border-gray-300 rounded-lg p-[10px] m-[10px]">
        {data &&
          data.map((doc) => (
            <div
              className="relative flex justify-center w-auto h-[100px]"
              key={uniqid()}
              id={doc.id}
            >
              <button
                type="button"
                className="absolute flex flex-col justify-center w-full h-[100px] border border-gray-300 rounded-lg"
                style={{ zIndex: 1 }}
                onClick={() => changeSectionHandler(doc)}
                disabled={collection === "chapters"}
              />
              <div className="flex w-full p-5">
                <div className="proj-info flex flex-col items-start w-full">
                  <div className="text-lg doc-title">
                    {capitalizeStr(doc.title)}
                  </div>
                  <div className="flex text-xs">on {doc.date_formatted}</div>
                </div>
                <button
                  type="button"
                  className="flex flex-col z-10"
                  onClick={() => targetCorrectButton(doc)}
                >
                  ...
                </button>
              </div>
              {showOptions === doc.id && (
                <FileOptions
                  view={viewClickHandler}
                  edit={editClickHandler}
                  del={deleteClickHandler}
                  id={doc.id}
                />
              )}
            </div>
          ))}
      </div>
      {docToDeleteTitle && (
        <ConfirmDelete
          title={docToDeleteTitle}
          deleteDocument={deleteDocument}
          setDocToDeleteTitle={setDocToDeleteTitle}
        />
      )}
      {showCreateProject && (
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

      <ContributionGraph />
    </div>
  );
}
