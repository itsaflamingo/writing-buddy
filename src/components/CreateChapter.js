/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import useFetch from '@/customHooks/useFetch';
import { CurrentActContext, UserContext } from '@/contexts/Contexts';
import { useRouter } from 'next/router';

export default function CreateChapter() {
  const router = useRouter();
  const { data } = router.query;
  let parsedData = null;

  const { user } = useContext(UserContext);
  const { token } = user;
  const { currentAct } = useContext(CurrentActContext);
  const actId = currentAct[0]._id;

  // Creates reference to tinyMCE editor instance
  const editorRef = useRef(null);
  const fetch = useFetch();

  const [input, setInput] = useState({
    title: null,
    number: '',
    body: null,
    isPublished: false,
    isComplete: false,
  })

  const [error, setError] = useState(null);

  const numberOnChange = (e) => {
    setInput((v) => (
      e.target.validity.valid ? { ...input,
        number: e.target.value } : { input,
        number: v }))
  }

  const textOnChange = (e, value) => setInput({ ...input, [value]: e.target.value });
  const bodyOnChange = (content) => setInput({ ...input, body: content });
  const checkboxOnChange = (value) => setInput({ ...input, [value]: !input[value] });

  useEffect(() => {
    if (!data) return;
    parsedData = JSON.parse(data);
    setInput(parsedData);
  }, [])

  const isFormValid = () => {
    if (input.title === null) {
      setError('Title field must be filled');
      return false
    }
    if (input.number.length === 0) {
      setError('Number field must be filled');
      return false;
    }
    if (input.body === null) {
      setError('Body field must have some content');
      return false;
    }
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (isFormValid() === false) return;

    if (parsedData) {
      fetch.updateData(`/hub/chapter/${parsedData.id}/update/`, input, token)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => setError(err))
      return;
    }

    fetch.createData(`/hub/act/${actId}/chapter/create`, input, token)
      .then((res) => console.log(res))
      .catch((err) => setError(err));
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <form className="flex flex-col" onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={input.title} onChange={(e) => textOnChange(e, 'title')} />

        <label htmlFor="number">Number</label>
        <input
          type="number"
          id="number"
          pattern="[0-9]*"
          value={input.number}
          onChange={(e) => numberOnChange(e)}
        />

        <label htmlFor="body">Body</label>
        <Editor
          apiKey={process.env.REACT_APP_TINYMCE_KEY}
        // Assigns current editor instance to editorRef so contents can be accessed and manipulated programmatically
        // Without this, the program wouldn't be able to access editor content
          onInit={(evt, editor) => editorRef.current = editor}
          className="body"
          value={input.body}
          onEditorChange={bodyOnChange}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            ],
            toolbar: 'undo redo | blocks | '
                      + 'bold italic forecolor | alignleft aligncenter '
                      + 'alignright alignjustify | bullist numlist outdent indent | '
                      + 'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
        <label htmlFor="isComplete">Is Complete</label>
        <input type="checkbox" id="isComplete" value={input.isComplete} onChange={() => checkboxOnChange('isComplete')} />

        <label htmlFor="isPublished">Is Published</label>
        <input type="checkbox" id="isPublished" value={input.isPublished} onChange={() => checkboxOnChange('isPublished')} />

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
