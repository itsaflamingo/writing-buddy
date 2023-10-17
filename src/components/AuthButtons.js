import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '@/contexts/Contexts';
import Logout from './Logout';

export default function AuthButtons() {
  const { userData } = useContext(UserContext);

  let user;

  if (userData) {
    user = userData.user;
  }

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
        {(!userData || ('user' in userData && !user.user)) && <button type="button" onClick={() => visitLogin()} className="text-white min-h-[40px]">LOG IN</button>}
        {userData && <Logout />}
      </div>
      {!userData && (
      <div className="flex justify-center items-center border border-solid w-20 font-medium">
        <button type="button" onClick={() => visitSignUp()} className="text-white min-h-[40px]">SIGN UP</button>
      </div>
      )}
    </div>
  )
}
