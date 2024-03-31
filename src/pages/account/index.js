import { useContext } from 'react';
import { UserContext } from '@/contexts/Contexts';

export default function Account() {
  const { userData } = useContext(UserContext);
  const { user } = userData;
  const { token } = user;

  return (
    <div>
      <h1>Account</h1>
    </div>
  )
}
