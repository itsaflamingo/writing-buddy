export default function UserInfo({ visitAccountPage }) {
  return (
    <div className="flex flex-col items-center">
      <div className="m-[10px] h-48 w-48 border-solid border-gray-300 border rounded-full" />
      <button type="button" onClick={() => visitAccountPage()}>Account</button>
    </div>
  )
}
