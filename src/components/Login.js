import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { api_url } from "../api/url";
import { UserContext } from "@/contexts/Contexts";
import backgImg from "../images/log-in-background.png";

export default function Login() {
  const { setUserData } = useContext(UserContext);
  const router = useRouter();
  // These two change at the same time, so they are grouped together
  const [input, setInput] = useState({
    username: null,
    password: null,
  });

  const [error, setError] = useState(null);

  const goToDashboard = () => {
    router.push({
      pathname: "/dashboard/",
    });
  };

  const onChangeHandler = (e, label) =>
    setInput({ ...input, [label]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: input.username,
      password: input.password,
    };
    axios
      .post(`${api_url}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("USER:", res);
        process.env.REACT_APP_TOKEN = res.data.token;
        setUserData({ user: res.data, setUserData });
        goToDashboard();
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        return;
      });
  };

  const divStyle = {
    backgroundImage: `url(${backgImg.src})`,
  };

  return (
    <div
      className="relative flex w-screen h-screen bg-no-repeat bg-cover"
      style={divStyle}
    >
      <div
        className="flex flex-col justify-center max-w-sm h-screen text-white"
        style={{ zIndex: 1 }}
      >
        <div className="flex justify-center text-xl font-bold">LOG IN</div>
        <form className="flex flex-col m-3 items-center">
          {error && <div>{error.message}</div>}
          <div className="flex gap-3 m-3 p-3">
            <label htmlFor="username">Username</label>
            <input
              className="border text-black"
              id="username"
              type="text"
              onChange={(e) => onChangeHandler(e, "username")}
            />
          </div>
          <div className="flex gap-3 m-3 p-3">
            <label htmlFor="password">Password</label>
            <input
              className="border text-black"
              id="password"
              type="password"
              onChange={(e) => onChangeHandler(e, "password")}
            />
          </div>
          <button
            className="border min-w-[150px] min-h-[40px] font-bold"
            type="submit"
            onClick={(e) => onSubmit(e)}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="absolute top-0 left-0 h-screen w-[384px] opacity-20 bg-black" />
    </div>
  );
}
