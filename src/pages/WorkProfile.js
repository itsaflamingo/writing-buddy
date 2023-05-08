export default function WorkProfile({ data }) {
  return (
    <div className="work-profile">
      <div className="projects max-w-[800px] w-[600px] grid grid-cols-3 gap-[10px] border border-gray-300 p-[10px] m-[10px]">
        {data && data.map((doc) => (
          <div className="w-auto h-[200px] flex-col border border-gray-300">
            <div>{doc.title}</div>
            <div>{doc.date_formatted}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
