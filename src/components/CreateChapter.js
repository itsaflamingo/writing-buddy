import React, { useState } from 'react'

export default function CreateChapter() {
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
        <label htmlFor="title" />
        <input type="text" id="title" onChange={(e) => textOnChange(e, 'title')} />

        <label htmlFor="number" />
        <input
          type="number"
          id="number"
          pattern="[0-9]*"
          value={input.number}
          onChange={(e) => numberOnChange(e)}
        />

        <label htmlFor="body" />
        <input type="text" id="body" onChange={(e) => textOnChange(e, 'body')} />

        <label htmlFor="isComplete" />
        <input type="checkbox" id="isComplete" onChange={(e) => checkboxOnChange(e, 'isComplete')} />

        <label htmlFor="isPublished" />
        <input type="checkbox" id="isPublished" onChange={(e) => checkboxOnChange(e, 'isPublished')} />
      </form>
    </div>
  )
}
