const switchNavButton = (document) => (document.title ? document.title : 'Projects');

export default function NavigationButton({ document, section, changeSection }) {
  return (
    <div>
      <button type="button" className="border border-solid w-40 ml-[10px] flex justify-center text-xs" onClick={() => changeSection(document, section)}>
        {switchNavButton(document)}
      </button>
    </div>
  )
}
