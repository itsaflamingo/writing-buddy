const switchNavButton = (document) =>
  "title" in document ? document.title : "Projects";

export default function NavigationButton({ document, section, changeSection }) {
  if (document === undefined) return;

  return (
    <div>
      <button
        type="button"
        className="border border-solid w-40 ml-[10px] flex justify-center text-xs rounded-md"
        onClick={() => changeSection(document, section)}
      >
        {switchNavButton(document)}
      </button>
    </div>
  );
}
