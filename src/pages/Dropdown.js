export default function Dropdown({ allOptions, selectedOption, setSelectedOption }) {
  console.log(selectedOption)
  const handleChange = (e) => {
    const value = e.target.value === 'Select...' ? '' : e.target.value;
    setSelectedOption(value);
  }

  return (
    <select id="dropdown" value={selectedOption} onChange={() => handleChange()}>
      {allOptions.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  )
}
