const switchNavButton = (document) => document.title;

export default function NavigationButton({ document, section, changeSection }) {
  return (
    <div>
      <button type="button" onClick={() => changeSection(document, section)}>
        {switchNavButton(document)}
      </button>
    </div>
  )
}
