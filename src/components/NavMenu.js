import uniqid from 'uniqid';

export default function NavMenu({ context, showMenuItem }) {
  return (
    <div className="flex flex-col gap-2 justify-center sticky">
      {context && context.map((data) => (
        <button type="button" onClick={(e) => showMenuItem(e)} key={uniqid()}>
          <div className="doc-title">{data.title}</div>
        </button>
      ))}
      <div className="flex flex-col gap-2 m-5">
        <button className="border-2 px-10" type="button">Edit</button>
        <button className="border-2 px-10" type="button">Delete</button>
      </div>
    </div>
  )
}
