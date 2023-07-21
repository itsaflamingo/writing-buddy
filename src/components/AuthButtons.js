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

  const visitSignUp = () => {
    router.push({
      pathname: '/sign-up',
    })
  }

  return (
    <div className="flex gap-5">
      <div className="flex justify-center items-center border border-solid w-20 font-medium">
        {!user && <button type="button" onClick={() => visitLogin()}>Sign In</button>}
        {user && <button type="button">Sign Out</button>}
      </div>
      {!user && (
      <div className="flex justify-center items-center border border-solid w-20 font-medium">
        <button type="button" onClick={() => visitSignUp()}>Sign Up</button>
      </div>
      )}
    </div>
  )
}
