export default function SettingsNavBar({ setPage }) {
  return (
    <div className="border-2 border-black h-screen w-1/4 flex flex-col">
      <button
        className="border-2"
        onClick={() => setPage(true)}
        type="button"
      >
        Account
      </button>
      <button
        className="border-2"
        onClick={() => setPage(false)}
        type="button"
      >
        Settings
      </button>
    </div>
  )
}
