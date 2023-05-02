import { useState } from 'react';
import axios from 'axios';
import { api_url } from './api/url';

export default function Login() {
  // These two change at the same time, so they are grouped together
  const [input, setInput] = useState({
    username: null,
    password: null,
  })

  const onChangeHandler = (e, label) => setInput({ ...input, [label]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new URLSearchParams({
      username: input.username,
      password: input.password,
    }).toString();

    axios.post(`${api_url}/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        process.env.REACT_APP_TOKEN = res.data.token;
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="login">
      <form>
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
