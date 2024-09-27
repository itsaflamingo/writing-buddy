export default function FileOptions(view, edit, del, id) {
  return (
    <div
      className="absolute flex flex-col border border-gray-300 rounded-md bg-white right-[-40px] top-7 text-sm p-1 bg-white z-10"
      id={id}
    >
      <button type="button" onClick={(e) => view(e)} style={{ zIndex: 2 }}>
        View
      </button>
      <button
        type="button"
        className="w-full border-t border-b border-gray-300"
        onClick={(e) => edit(e)}
        style={{ zIndex: 2 }}
      >
        Edit
      </button>
      <button type="button" onClick={(e) => del(e)} style={{ zIndex: 2 }}>
        Delete
      </button>
    </div>
  );
}
