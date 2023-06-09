import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/Contexts';

export default function SignUp() {
  const user = useContext(UserContext);
  // These two change at the same time, so they are grouped together
  const [input, setInput] = useState({
    username: null,
    password: null,
  })

  const [error, setError] = useState(null);

  const onChangeHandler = (e, label) => setInput({ ...input, [label]: e.target.value });
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
        user.setUser(res.data);
      })
      .catch((err) => setError(err))
  }

  return (
    <div>
      <form>
        {error && <div>{error.message}</div>}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={(e) => onChangeHandler(e, 'username')}
        />
        <label htmlFor="password">Password</label>
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
