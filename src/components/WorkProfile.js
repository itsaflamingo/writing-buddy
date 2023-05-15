import useFetch from "@/customHooks/useFetch";
import { useMemo } from "react";

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
  const fetch = useFetch();
  // Cache previous section.func value to prevent unnecessary re-renders
  const newSection = useMemo(() => calcSection(section.collection), [section.collection]);

  const changeSectionHandler = (doc) => {
    setData(null)
    changeSection({ id: doc.id, func: newSection });
  }

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

  const routeToFunction = (e) => {
    e.stopPropagation();
    // switch(section) {
    //   case 'projects':
    // }
  }

  return (
    <div className="work-profile">
      <div className="projects max-w-[800px] w-[600px] grid grid-cols-3 gap-[10px] border border-gray-300 p-[10px] m-[10px]">
        {data && data.map((doc) => (
          <button
            type="button"
            className="w-auto h-[200px] flex-col border border-gray-300"
            onClick={() => changeSectionHandler(doc)}
            disabled={section.func === 'chapters'}
          >
            <div className="proj-info">
              <div>{doc.title}</div>
              <div>{doc.date_formatted}</div>
            </div>
            <div className="proj-buttons flex gap-2">
              <button type="button" onClick={(e) => viewClickHandler(e)}>View</button>
              <button type="button" onClick={(e) => editClickHandler(e)}>Edit</button>
              <button type="button" onClick={(e) => deleteClickHandler(e)}>Delete</button>
              <button type="button" onClick={(e) => routeToFunction(e)}>New {newSection}</button>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
