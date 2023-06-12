import { useContext } from 'react'
import { CurrentProjectContext } from '@/contexts/Contexts'

export default function NavMenu({ context }) {
  return (
    <div className="flex flex-col">
      {context && context.map((data) => (
        <div>
          {data.title}
        </div>
      ))}
    </div>
  )
}
