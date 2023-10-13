import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/Contexts';
import { api_url } from '@/api/url';
import backgroundImg from '../images/sign-up-im.jpg';

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

  const divStyle = {
    backgroundImage: `url(${backgroundImg.src})`,
  };

  return (
    <div className="relative flex w-screen h-screen bg-no-repeat bg-cover" style={divStyle}>
      <div className="flex flex-col justify-center max-w-sm h-screen text-white" style={{ zIndex: 1 }}>
        <div className="flex justify-center text-xl font-bold">SIGN UP</div>
        <div>
          <form className="flex flex-col m-3 items-center">
            {error && <div>{error.message}</div>}
            <div className="flex gap-3 m-3 p-3">
              <label htmlFor="username">Create Username</label>
              <input
                className="border"
                id="username"
                type="text"
                onChange={(e) => onChangeHandler(e, 'username')}
              />
            </div>
            <div className="flex gap-3 m-3 p-3">
              <label htmlFor="password">Create Password</label>
              <input
                className="border"
                id="password"
                type="password"
                onChange={(e) => onChangeHandler(e, 'password')}
              />
            </div>
            <button
              type="submit"
              onClick={(e) => onSubmit(e)}
              className='border min-w-[150px] min-h-[40px] font-bold'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="absolute top-0 left-0 h-screen w-[384px] opacity-20 bg-black" />
    </div>
  )
}
