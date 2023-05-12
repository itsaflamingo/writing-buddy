import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Dropdown({ allOptions, selectedOption, setSelectedOption }) {
  const router = useRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === 'Chapter') {
      router.push('/chapter/create-chapter');
    } else {
      // handle other options
      setSelectedOption(value);
    }
  }

  return (
    <select id="dropdown" value={selectedOption} onChange={(e) => handleChange(e)}>
      {allOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}
