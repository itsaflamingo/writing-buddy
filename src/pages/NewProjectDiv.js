import { useContext, useState } from 'react';
import genreOptions from '@/functions/genreOptions';
import useFetch from '@/customHooks/useFetch';
import { UserContext } from '@/contexts/Contexts';

export default function NewProjectDiv() {
  const { user } = useContext(UserContext);
  const userId = user.user._id;
  const { token } = user.user;

  const [options, setOptions] = useState(genreOptions());
  const [input, setInput] = useState({
    title: null,
    genre: null,
    isPublished: false,
    isComplete: false,
  })
  const fetch = useFetch();

  const onTitleChange = (e) => setInput({ ...input, title: e.target.value });
  const onGenreChange = (e) => setInput({ ...input, genre: e.target.value });
  const onPublishedChange = () => setInput({ ...input, isPublished: !input.isPublished });
  const onCompletedChange = () => setInput({ ...input, isCompleted: !input.isPublished });

  const onFormSubmit = (e) => {
    e.preventDefault();

    return fetch.createData(`/hub/user/${userId}/project/create`, input, token)
      .then((res) => res)
      .catch((err) => err)
  }

  return (
    <div className="new-project absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto max-w-md px-10 py-5 space-y-5 border border-gray-300" onSubmit={(e) => onFormSubmit(e)}>
      <form>
        <div className="flex-col">
          <label className="font-bold text-gray-700 mb-2" htmlFor="new_post_title">Title</label>
          <input
            className="w-full border border-gray-400 p-2 rounded-md"
            type="text"
            onChange={(e) => onTitleChange(e)}
            id="new_post_title"
          />
        </div>
        <div className="flex-col">
          <label className="font-bold text-gray-700 mb-2" htmlFor="new_post_genre">Genre</label>
          <input
            className="w-full border border-gray-400 p-2 rounded-md"
            id="new_post_genre"
            type="text"
            onChange={(e) => onGenreChange(e)}
          />
        </div>
        {/* <Dropdown placeHolder="Select genre..." options={options} /> */}
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
  )
}
