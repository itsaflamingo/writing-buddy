import { useContext, useEffect, useMemo, useState } from 'react';
import { CurrentActContext, CurrentProjectContext, ProjectContext } from '@/contexts/Contexts';
import NavigationButton from './NavigationButton';
import returnSingularCollection from '@/functions/returnSingularCollection';

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
  // Cache previous section.func value to prevent unnecessary re-renders
  const newSection = useMemo(() => calcSection(section.collection), [section.collection]);
  const [navButtons, setNavButtons] = useState(null);

  const changeSectionHandler = (doc, collection) => {
    setData(null)
    if (!collection) {
      return changeSection({ id: doc.id, collection: newSection });
    }

    return changeSection({ id: doc.id, collection });
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

  const newDocument = (e) => {
    e.stopPropagation();
    const section = e.target.innerHTML;
    const name = e.target.parentElement.parentElement.childNodes[0].childNodes[0].innerText;
  }

  return (
    <div className="work-profile">
      <div>
        {(section.collection === 'acts' && currentProject) && <NavigationButton document={currentProject[0]} changeSection={changeSectionHandler} section="acts" />}
        {(section.collection === 'chapters' && currentProject && currentAct)
        && (
        <>
          <NavigationButton document={currentProject[0]} changeSection={changeSectionHandler} section="acts" />
          <NavigationButton document={currentAct[0]} changeSection={changeSectionHandler} section="chapters" />
        </>
        )}
        <button
          type="button"
        >
          New
          {' '}
          {returnSingularCollection(section.collection)}
        </button>
      </div>
      <div className="projects max-w-[800px] w-[600px] grid grid-cols-3 gap-[10px] border border-gray-300 p-[10px] m-[10px]">
        {data && data.map((doc) => (
          <button
            type="button"
            className="w-auto h-[200px] flex-col border border-gray-300"
            onClick={() => changeSectionHandler(doc)}
            disabled={section.collection === 'chapters'}
          >
            <div className="proj-info">
              <div>{doc.title}</div>
              <div>{doc.date_formatted}</div>
            </div>
            <div className="proj-buttons flex gap-2">
              <button type="button" className="border border-gray-300" onClick={(e) => viewClickHandler(e)}>View</button>
              <button type="button" className="border border-gray-300" onClick={(e) => editClickHandler(e)}>Edit</button>
              <button type="button" className="border border-gray-300" onClick={(e) => deleteClickHandler(e)}>Delete</button>
              <button type="button" className="border border-gray-300" onClick={(e) => newDocument(e)}>
                New
                {' '}
                {newSection}
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
