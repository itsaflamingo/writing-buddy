import { useContext, useEffect, useState } from 'react';
import useFetch from '@/customHooks/useFetch';
import { ProjectContext, UserContext } from '@/contexts/Contexts';

export default function NewProjectDiv(props) {
  const { editInput, refreshSection, collection, setShowCreateProject } = props;
  const { user } = useContext(UserContext);
  const userId = user.user._id;
  const { token } = user;
  const { projects, setProjects } = useContext(ProjectContext);

  const [input, setInput] = useState({
    title: null,
    genre: null,
    isPublished: false,
    isComplete: false,
  })
  const [error, setError] = useState(null);
  const fetch = useFetch();

  const updateSection = (doc, id, documents) => {
    const hasId = (value) => value._id === id;
    const index = documents.findIndex(hasId);

    const updatedDocuments = [...projects];
    updatedDocuments[index] = doc;

    setProjects(updatedDocuments)
  }

  const onTitleChange = (e) => setInput({ ...input, title: e.target.value });
  const onGenreChange = (e) => setInput({ ...input, genre: e.target.value });
  const onPublishedChange = () => setInput({ ...input, isPublished: !input.isPublished });
  const onCompletedChange = () => setInput({ ...input, isCompleted: !input.isPublished });

  const isFormValid = () => {
    if ((input.title || input.genre) === null) {
      setError('Title and genre fields must be filled');
      return false
    }
    return true;
  }

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (isFormValid() === false) return;

    if (editInput) {
      fetch.updateData(`/hub/project/${editInput.id}/update/`, input, token)
        .then((res) => {
          updateSection(res.data, editInput.id, projects);
          refreshSection(user.user, collection);
          setShowCreateProject(false);
        })
        .catch((err) => setError(err))
      return;
    }

    fetch.createData(`/hub/user/${userId}/project/create`, input, token)
      .then((res) => {
        setProjects([res.data, ...projects])
        refreshSection(user.user, collection)
        setShowCreateProject(false)
      })
      .catch((err) => setError(err))
  }

  useEffect(() => {
    if (!editInput) return;
    setInput(editInput)
  }, [])

  return (
    <div className="new-project absolute opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto max-w-md px-10 py-5 space-y-5 border border-gray-300">
      <div>
        {error && <div>{error}</div>}
        <form onSubmit={(e) => onFormSubmit(e)}>
          <div className="flex-col">
            <label className="font-bold text-gray-700 mb-2" htmlFor="new_post_title">Title</label>
            <input
              className="w-full border border-gray-400 p-2 rounded-md"
              type="text"
              onChange={(e) => onTitleChange(e)}
              id="new_post_title"
              value={input.title}
            />
          </div>
          <div className="flex-col">
            <label className="font-bold text-gray-700 mb-2" htmlFor="new_post_genre">Genre</label>
            <input
              className="w-full border border-gray-400 p-2 rounded-md"
              id="new_post_genre"
              type="text"
              onChange={(e) => onGenreChange(e)}
              value={input.genre}
            />
          </div>
          <div className="flex my-[5px] justify-between px-[20px]">
            <label className="font-bold text-gray-700 mb-2" htmlFor="new_post_published">Published</label>
            <input
              className="border border-gray-400 p-2 rounded-md"
              type="checkbox"
              id="new_post_published"
              onChange={(e) => onPublishedChange(e)}
            />
          </div>
          <div className="flex my-[5px] justify-between px-[20px]">
            <label className="font-bold text-gray-700 mb-2" htmlFor="new_post_completed">Completed</label>
            <input
              className="border border-gray-400 p-2 rounded-md"
              type="checkbox"
              id="new_post_completed"
              onChange={(e) => onCompletedChange(e)}
            />
          </div>
          <div className="w-full flex justify-center">
            <button type="submit" className="border border-gray-400 p-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
      <button className="absolute left-[95%] bottom-[90%]" type="button" onClick={() => setShowCreateProject(false)}>X</button>
    </div>
  )
}
