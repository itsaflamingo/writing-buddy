const calcSection = (section) => {
  let newSect;
  switch (section) {
    case 'projects':
      newSect = 'acts'
      break;
    default: newSect = section;
  }
  return newSect;
}

export default function WorkProfile({ data, setData, section, changeSection }) {
  const newSection = calcSection(section.func);

  console.log(newSection);

  const changeSectionHandler = (doc) => {
    setData(null)
    changeSection({ id: doc.id, func: newSection });
  }

  return (
    <div className="work-profile">
      <div className="projects max-w-[800px] w-[600px] grid grid-cols-3 gap-[10px] border border-gray-300 p-[10px] m-[10px]">
        {data && data.map((doc) => (
          <button
            type="button"
            className="w-auto h-[200px] flex-col border border-gray-300"
            onClick={() => changeSectionHandler(doc)}
          >
            <div>{doc.title}</div>
            <div>{doc.date_formatted}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
