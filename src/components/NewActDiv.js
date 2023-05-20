import { useContext, useState } from 'react'
import { ActContext, CurrentProjectContext, UserContext } from '@/contexts/Contexts';
import useFetch from '@/customHooks/useFetch';

export default function NewActDiv({ refreshSection, collection, setShowCreateAct }) {
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

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (isFormValid() === false) return;

    fetch.createData(`/hub/project/${projectId}/act/create`, input, token)
      .then((res) => {
        console.log(res.data);
        setActs([res.data, ...acts])
        refreshSection(currentProject[0], collection)
        setShowCreateAct(false)
      })
      .catch((err) => setError(err))
  }

  return (
    <div className="new-project absolute opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto max-w-md px-10 py-5 space-y-5 border border-gray-300">
      <div>
        {error && <div>{error}</div>}
        <form onSubmit={(e) => onFormSubmit(e)}>
          <label
            htmlFor="new-act-title"
          >
            Title
          </label>
          <input
            type="text"
            id="new-act-title"
            onChange={(e) => titleOnChange(e)}
          />

          <label
            htmlFor="new-act-completed"
            onChange={() => toggleIsCompleted()}
          >
            Completed
          </label>
          <input type="checkbox" id="new-act-completed" />

          <label
            htmlFor="new-act-published"
            onChange={() => toggleIsPublished()}
          >
            Published
          </label>
          <input type="checkbox" id="new-act-published" />

          <button type="submit">Submit</button>
        </form>
      </div>
      <button type="button" onClick={() => setShowCreateAct(false)}>X</button>
    </div>
  )
}
