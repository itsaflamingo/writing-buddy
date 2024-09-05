/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import useFetch from "@/customHooks/useFetch";
import {
  CurrentActContext,
  CurrentChapterContext,
  UserContext,
} from "@/contexts/Contexts";

export default function CreateChapter() {
  const router = useRouter();
  const { data } = router.query;
  let parsedData = null;

  const { userData } = useContext(UserContext);
  const { user } = userData;
  const { token } = user;

  const { currentAct } = useContext(CurrentActContext);
  const actUrl = currentAct[0].url;
  const { currentChapter, setCurrentChapter } = useContext(
    CurrentChapterContext
  );

  // Creates reference to tinyMCE editor instance
  const editorRef = useRef(null);
  const fetch = useFetch(token);

  const [input, setInput] = useState({
    title: null,
    number: "",
    body: null,
    isPublished: false,
    isComplete: false,
  });

  const [error, setError] = useState(null);

  const numberOnChange = (e) => {
    setInput((v) =>
      e.target.validity.valid
        ? { ...input, number: e.target.value }
        : { input, number: v }
    );
  };

  const textOnChange = (e, value) =>
    setInput({ ...input, [value]: e.target.value });
  const bodyOnChange = (content) => setInput({ ...input, body: content });
  const checkboxOnChange = (value) =>
    setInput({ ...input, [value]: !input[value] });

  useEffect(() => {
    if (!data) return;
    parsedData = JSON.parse(data);
    setInput(parsedData);
  }, []);

  const isFormValid = () => {
    if (input.title === null) {
      setError("Title field must be filled");
      return false;
    }
    if (input.number.length === 0) {
      setError("Number field must be filled");
      return false;
    }
    if (input.body === null) {
      setError("Body field must have some content");
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isFormValid() === false) return;

    console.log(parsedData);

    // If data was passed from router.query, data is to be updated
    if (parsedData) {
      fetch
        .updateData(parsedData.url, input)
        .then((res) => {
          setCurrentChapter(res.data);
          router.push("/chapter/view");
        })
        .catch((err) => setError(err));
      return;
    }
    // Else, data is to be created
    fetch
      .createData(actUrl, input)
      .then((res) => {
        setCurrentChapter(res.data);
        router.push("/chapter/view");
      })
      .catch((err) => setError(err));
  };

  return (
    <div className="flex justify-center w-100 p-4">
      {error && <div>Error</div>}
      <form
        className="flex flex-col w-8/12 items-center"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="w-full">
          <label
            htmlFor="title"
            className="font-bold text-gray-700 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={input.title}
            onChange={(e) => textOnChange(e, "title")}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="number"
            className="font-bold text-gray-700 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Number
          </label>
          <input
            type="number"
            id="number"
            pattern="[0-9]*"
            value={input.number}
            onChange={(e) => numberOnChange(e)}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>

        <label
          htmlFor="body"
          className="w-full font-bold text-gray-700 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Body
        </label>
        <Editor
          apiKey={process.env.REACT_APP_TINYMCE_KEY}
          // Assigns current editor instance to editorRef so contents can be accessed and manipulated programmatically
          // Without this, the program wouldn't be able to access editor content
          onInit={(evt, editor) => (editorRef.current = editor)}
          className="body"
          value={input.body}
          onEditorChange={bodyOnChange}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div className="flex items-center justify-around w-full">
          <label htmlFor="isComplete" className="font-bold text-gray-700 mb-2">
            Completed
          </label>
          <input
            type="checkbox"
            id="isComplete"
            value={input.isComplete}
            onChange={() => checkboxOnChange("isComplete")}
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="flex items-center justify-around w-full">
          <label htmlFor="isPublished" className="font-bold text-gray-700 mb-2">
            Publish
          </label>
          <input
            type="checkbox"
            id="isPublished"
            value={input.isPublished}
            onChange={() => checkboxOnChange("isPublished")}
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="border border-gray-400 p-2 rounded-md hover:bg-gray-500 hover:text-white transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
