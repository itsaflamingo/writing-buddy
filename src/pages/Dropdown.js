import Link from 'next/link';
import { useEffect } from 'react';

export default function Dropdown({ allOptions, selectedOption, setSelectedOption }) {
  const handleClick = (e) => {
    const { value } = e.target;
    setSelectedOption(value)
  }

  return (
    <div>
      {allOptions.map((opt) => (
        opt === 'Chapter' ? (
          <Link href="/chapter/create">
            Chapter
          </Link>
        ) : (
          <button type="button" key={opt} value={opt} onClick={(e) => handleClick(e)}>
            {opt}
          </button>
        )
      ))}
    </div>
  )
}
