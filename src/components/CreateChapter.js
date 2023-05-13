/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export default function CreateChapter() {
    // Creates reference to tinyMCE editor instance
    const editorRef = useRef(null);

  const [input, setInput] = useState({
    title: null,
    number: null,
    body: null,
    isPublished: false,
    isComplete: false,
  })

  const numberOnChange = (e) => {
    setInput((v) => (
      e.target.validity.valid ? { ...input,
        number: e.target.value } : { input,
        number: v }))
  }

  const textOnChange = (e, value) => setInput({ ...input, [value]: e.target.value });

  const checkboxOnChange = (e, value) => setInput({ ...input, [value]: !input[value] });

  return (
    <div>
      <form className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" onChange={(e) => textOnChange(e, 'title')} />

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
          onEditorChange={(e) => textOnChange(e, 'body')}
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
        <input type="checkbox" id="isComplete" onChange={(e) => checkboxOnChange(e, 'isComplete')} />

        <label htmlFor="isPublished">Is Published</label>
        <input type="checkbox" id="isPublished" onChange={(e) => checkboxOnChange(e, 'isPublished')} />
      </form>
    </div>
  )
}
