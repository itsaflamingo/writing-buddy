export default function ConfirmDelete({
  title,
  deleteDocument,
  setDocToDeleteTitle,
}) {
  return (
    <div className="absolute flex items-center gap-6 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto max-w-md px-10 py-5 border border-gray-300 bg-white z-10">
      <div>Are you sure you want to delete {title}?</div>
      <button
        type="button"
        className="flex justify-center items-center border border-gray-300 border border-gray-400 p-2 rounded-md"
        onClick={() => deleteDocument(title)}
      >
        Delete
      </button>
      <button
        type="button"
        className="flex justify-center items-center border border-gray-300 border border-gray-400 p-2 rounded-md"
        onClick={() => setDocToDeleteTitle(null)}
      >
        Cancel
      </button>
    </div>
  );
}
