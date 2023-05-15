export default function Menu({ changeSection, id }) {
  const showNewSection = () => changeSection({ id, collection: 'projects' })

  return (
    <div className="menu container max-w-[130px] flex flex-col ">
      <button
        type="button"
        className="hover:bg-sky-700 max-w-fit"
        onClick={() => showNewSection()}
      >
        Projects
      </button>
    </div>
  )
}
