import { useContext } from 'react';
import { useRouter } from 'next/router';
import Login from './Login';
import { UserContext } from '@/contexts/Contexts';
import Logout from './LogOut';

export default function Header() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const goHome = () => {
    router.push({
      pathname: '/dashboard',
    });
  }

  return (
    <header className="flex justify-between h-[50px] border border-b-grey-300">
      {!user && <Login />}
      {user && <Logout />}
      <button type="button" onClick={() => goHome()}>Home</button>
    </header>
  )
}
