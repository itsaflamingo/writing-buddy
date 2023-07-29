import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@/contexts/Contexts';
import Logout from './Logout';

export default function AuthButtons() {
  const { userData } = useContext(UserContext);
  const { user } = userData;

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
        {(!userData || ('user' in userData && !user.user)) && <button type="button" onClick={() => visitLogin()}>Log In</button>}
        {user.user && <Logout />}
      </div>
      {!userData && (
      <div className="flex justify-center items-center border border-solid w-20 font-medium">
        <button type="button" onClick={() => visitSignUp()}>Sign Up</button>
      </div>
      )}
    </div>
  )
}
