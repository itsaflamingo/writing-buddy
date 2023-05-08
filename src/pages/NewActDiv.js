import { useState } from 'react'

export default function NewActDiv() {
  const [input, setInput] = useState({
    title: null,
    isComplete: false,
    isPublished: false,
  })

  const titleOnChange = (e) => setInput({ ...input, title: e.target.value });
  const toggleIsCompleted = () => setInput({ ...input, isComplete: !input.isComplete });
  const toggleIsPublished = () => setInput({ ...input, isPublished: !input.isPublished });

  return (
    <div>
      <form>
        <label
          htmlFor="new-act-title"
          onChange={(e) => titleOnChange(e)}
        >
          Title
        </label>
        <input type="text" id="new-act-title" />

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
  )
}
