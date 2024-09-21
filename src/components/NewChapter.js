import { useContext, useState } from "react";
import useFetch from "@/customHooks/useFetch";
import {
  ActContext,
  CurrentActContext,
  UserContext,
} from "@/contexts/Contexts";

export default function NewProjectDiv({
  refreshSection,
  collection,
  setShowCreateChapter,
}) {
  const { userData } = useContext(UserContext);
  const { user } = userData;
  const { token } = user;

  const { acts, setActs } = useContext(ActContext);
  const { currentAct } = useContext(CurrentActContext);
  const act = currentAct[0];

  const [input, setInput] = useState({
    title: "",
    number: "",
    body: "",
    isPublished: false,
    isComplete: false,
  });
  const [error, setError] = useState("");
  const fetch = useFetch(token);

  const onTitleChange = (e) => setInput({ ...input, title: e.target.value });
  const onNumberChange = (e) => setInput({ ...input, number: e.target.value });
  const onBodyChange = (e) => setInput({ ...input, body: e.target.value });
  const onPublishedChange = () =>
    setInput({ ...input, isPublished: !input.isPublished });
  const onCompletedChange = () =>
    setInput({ ...input, isCompleted: !input.isPublished });

  const isFormValid = () => {
    if (input.title.length === 0) {
      setError("Title field must be filled");
      return false;
    }
    if (input.number.length === 0) {
      setError("Number field must be filled");
      return false;
    }
    if (input.body.length === 0) {
      setError("Body field must have some content");
      return false;
    }
    return true;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (isFormValid() === false) return;

    fetch
      .createData(act.url, input)
      .then((res) => {
        setActs([res.data, ...acts]);
        refreshSection(act, collection);
        setShowCreateChapter(false);
      })
      .catch((err) => setError(err));
  };

  return (
    <div className="new-project absolute opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto max-w-md px-10 py-5 space-y-5 border border-gray-300 z-10">
      <div>
        {error && <div>{error}</div>}
        <form onSubmit={(e) => onFormSubmit(e)}>
          <div className="flex-col">
            <label
              className="font-bold text-gray-700 mb-2"
              htmlFor="new_post_title"
            >
              Title
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-md"
              type="text"
              onChange={(e) => onTitleChange(e)}
              id="new_post_title"
            />
          </div>
          <div className="flex-col">
            <label
              className="font-bold text-gray-700 mb-2"
              htmlFor="new_post_number"
            >
              Number
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-md"
              id="new_post_number"
              type="number"
              onChange={(e) => onNumberChange(e)}
            />
          </div>
          <div className="flex-col">
            <label
              className="font-bold text-gray-700 mb-2"
              htmlFor="new_post_body"
            >
              Body
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-md"
              type="text"
              onChange={(e) => onBodyChange(e)}
              id="new_post_body"
            />
          </div>
          <div className="flex my-[5px] justify-between px-[20px]">
            <label
              className="font-bold text-gray-700 mb-2"
              htmlFor="new_post_published"
            >
              Published
            </label>
            <input
              className="border border-gray-400 p-2 rounded-md"
              type="checkbox"
              id="new_post_published"
              onChange={(e) => onPublishedChange(e)}
            />
          </div>
          <div className="flex my-[5px] justify-between px-[20px]">
            <label
              className="font-bold text-gray-700 mb-2"
              htmlFor="new_post_completed"
            >
              Completed
            </label>
            <input
              className="border border-gray-400 p-2 rounded-md"
              type="checkbox"
              id="new_post_completed"
              onChange={(e) => onCompletedChange(e)}
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="border border-gray-400 p-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <button
        className="absolute left-[95%] bottom-[90%]"
        type="button"
        onClick={() => setShowCreateChapter(false)}
      >
        X
      </button>
    </div>
  );
}
