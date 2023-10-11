import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/Contexts';
import { api_url } from '@/api/url';

export default function SignUp() {
  const router = useRouter();

  const { userData, setUserData } = useContext(UserContext);

  // These two change at the same time, so they are grouped together
  const [input, setInput] = useState({
    username: null,
    password: null,
  })

  const [error, setError] = useState(null);

  const onChangeHandler = (e, label) => setInput({ ...input, [label]: e.target.value });

  useEffect(() => {
    if (!userData) return;

    router.push('/login');
  }, [userData])

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new URLSearchParams({
      username: input.username,
      password: input.password,
      admin: false,
    }).toString();

    axios.post(`${api_url}/sign-up`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        process.env.REACT_APP_TOKEN = res.data.token;
        setUserData(res.data);
      })
      .catch((err) => setError(err))
  }

  return (
    <div>
      <div>New User</div>
      <form>
        {error && <div>{error.message}</div>}
        <label htmlFor="username">Create Username</label>
        <input
          id="username"
          type="text"
          onChange={(e) => onChangeHandler(e, 'username')}
        />
        <label htmlFor="password">Create Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => onChangeHandler(e, 'password')}
        />
        <button
          type="submit"
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
