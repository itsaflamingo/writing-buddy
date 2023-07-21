import { useContext } from 'react'
import uniqid from 'uniqid';
import { CurrentProjectContext } from '@/contexts/Contexts'

export default function NavMenu({ context, showMenuItem }) {
  return (
    <div className="flex flex-col">
      {context && context.map((data) => (
        <button type="button" onClick={(e) => showMenuItem(e)} key={uniqid()}>
          <div className="doc-title">{data.title}</div>
        </button>
      ))}
    </div>
  )
}
