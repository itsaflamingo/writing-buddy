import { useContext, useEffect, useState } from 'react'
import { ActContext, CurrentProjectContext, UserContext } from '@/contexts/Contexts';
import useFetch from '@/customHooks/useFetch';

export default function NewActDiv({ editInput, refreshSection, collection, setShowCreateAct }) {
  const fetch = useFetch();
  const { acts, setActs } = useContext(ActContext);
  const { currentProject } = useContext(CurrentProjectContext);
  const projectId = currentProject[0]._id;
  const { user } = useContext(UserContext);
  const { token } = user;

  const [input, setInput] = useState({
    title: null,
    isComplete: false,
    isPublished: false,
  })
  const [error, setError] = useState(null);

  const titleOnChange = (e) => setInput({ ...input, title: e.target.value });
  const toggleIsCompleted = () => setInput({ ...input, isComplete: !input.isComplete });
  const toggleIsPublished = () => setInput({ ...input, isPublished: !input.isPublished });

  const isFormValid = () => {
    if (input.title === null) {
      setError('Title field must be filled');
      return false
    }
    return true;
  }

  const updateSection = (doc, id, documents) => {
    const hasId = (value) => value._id === id;
    const index = documents.findIndex(hasId);

    const updatedDocuments = [...acts];
    updatedDocuments[index] = doc;

    setActs(updatedDocuments)
  }

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (isFormValid() === false) return;

    if (editInput) {
      fetch.updateData(`/hub/act/${editInput.id}/update/`, input, token)
        .then((res) => {
          updateSection(res.data, editInput.id, acts);
          refreshSection(currentProject[0], collection);
          setShowCreateAct(false);
        })
        .catch((err) => setError(err))
      return;
    }

    fetch.createData(`/hub/project/${projectId}/act/create`, input, token)
      .then((res) => {
        setActs([res.data, ...acts])
        refreshSection(currentProject[0], collection)
        setShowCreateAct(false)
      })
      .catch((err) => setError(err))
  }

  useEffect(() => {
    if (!editInput) return;
    setInput(editInput)
  }, [])

  return (
    <div className="bg-white absolute opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto max-w-md px-10 py-5 space-y-5 border border-gray-300">
      <div>
        {error && <div>{error}</div>}
        <form onSubmit={(e) => onFormSubmit(e)} className="flex flex-col gap-4">
          <label className="font-bold text-gray-700 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
            htmlFor="new-act-title"
          >
            Title
          </label>
          <input className="w-full border border-gray-400 p-2 rounded-md"
            type="text"
            id="new-act-title"
            value={input.title}
            onChange={(e) => titleOnChange(e)}
          />
          <div className="flex items-center justify-center gap-9">
            <label className="font-bold text-gray-700 mb-2"
              htmlFor="new-act-completed"
              onChange={() => toggleIsCompleted()}
            >
              Completed
            </label>
            <input type="checkbox" id="new-act-completed" />
          </div>
          <div className="flex items-center justify-center gap-9">
            <label className="font-bold text-gray-700 mb-2"
              htmlFor="new-act-published"
              onChange={() => toggleIsPublished()}
            >
              Published
            </label>
            <input type="checkbox" id="new-act-published" />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="border border-gray-400 p-2 rounded-md w-fit">Submit</button>
          </div>
        </form>
      </div>
      <div className="absolute w-[27px] h-[27px] right-6 top-0 border rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 hover:text-white transition duration-300">
        <button type="button" className="text-gray-500 font-bold" onClick={() => setShowCreateAct(false)}>x</button>
      </div>
    </div>
  )
}
