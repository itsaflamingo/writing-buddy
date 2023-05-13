import { useContext } from 'react';
import Login from './Login';
import { UserContext } from '@/contexts/Contexts';
import Logout from './LogOut';

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between h-[50px] border border-b-grey-300">
      {!user && <Login />}
      {user && <Logout />}
    </header>
  )
}
