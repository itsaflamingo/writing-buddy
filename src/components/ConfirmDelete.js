export default function ConfirmDelete({ title, deleteDocument, setDocToDeleteTitle }) {
  return (
    <div className="absolute opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto max-w-md px-10 py-5 space-y-5 border border-gray-300" style={{ zIndex: 2 }}>
      <button type="button" onClick={() => deleteDocument(title)}>Confirm</button>
      <button type="button" onClick={() => setDocToDeleteTitle(null)}>Cancel</button>
    </div>
  )
}
