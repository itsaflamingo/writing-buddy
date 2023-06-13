import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@/contexts/Contexts';

export default function AuthButtons() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const visitLogin = () => {
    router.push({
      pathname: '/login',
    })
  }

  return (
    <div className="flex justify-center items-center border border-solid w-20 font-medium">
      {!user && <button type="button" onClick={() => visitLogin()} className='font-medium'>Sign In</button>}
      {user && <button type="button">Sign Out</button>}
    </div>
  )
}
