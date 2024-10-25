export default function DisplaySynonyms({ synonyms, antonyms }) {
  return (
    <div className="max-h-screen overflow-y-auto flex border border-solid rounded-lg font-medium m-[20px] p-[10px]">
      <div>
        <div className="flex justify-center border-b border-gray-300 pb-2 font-semibold">
          <p>Synonyms</p>
        </div>
        {synonyms.map((word) => {
          return <div>{word}</div>;
        })}
      </div>
      <div>
        <div className="flex justify-center border-b border-gray-300 pb-2 font-semibold">
          <p>Antonyms</p>
        </div>
        {antonyms.map((word) => {
          return <div>{word}</div>;
        })}
      </div>
    </div>
  );
}
