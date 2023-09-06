import { FormEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useLogin } from "../../LoginProvider";

interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  notify: (type: string) => void;
}

interface loginType {
  email: string;
  password: string;
  checked: boolean;
  token: string;
}

export default function ({ setTrigger, notify }: Props) {
  const login = useLogin();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const handleClick = () => {
    setTrigger((prev) => !prev);
  };

  useEffect(() => {
    localStorage.clear();
  });

  const newData: any = { ...login?.loginInfo };

  const handleChange = (e: any) => {
    newData[e.target.id] = e.target.value;
    login?.setLoginInfo(newData);
  };

  const handleChecked = () => {
    let isChecked = login?.loginInfo.checked;
    login?.setLoginInfo({ ...newData, checked: !isChecked });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let responseToken = "";
    let loginData: any = login?.loginInfo;

    //send login info to db
    if (login?.loginInfo.email === "" || login?.loginInfo.password === "") {
      notify("input");
      //   navigate('/dashboard')
    } else {
      axios
        .post("https://bug-tracker-f329.onrender.com/login", login?.loginInfo)
        .then(async function (response) {
          responseToken = response.data.data;
          //console.log('response data handle submit login',response.data)
          signIn({
            token: responseToken,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: {
              email: login?.loginInfo.email,
            },
          });
          navigate("/");
          login?.setLoginInfo({
            ...response.data,
            password: "",
            token: responseToken,
            _id: response.data.id,
          });
          localStorage.setItem("login state", JSON.stringify(response.data));
        })
        .catch(function (error) {
          if (error.response.data.error === "Incorrect password") {
            notify("password");
          }
          if (error.response.data.error === "user not found") {
            notify("user not found");
          }
          console.log(error.response.data);
        });
    }
  };

  const handleDemo = async () => {
    let responseToken = "";
    const newData: any = {
      email: "test@gmail.com",
      password: "123",
    };
    login?.setLoginInfo(newData);

    axios
      .post("https://bug-tracker-f329.onrender.com/login", newData)
      .then(async function (response) {
        responseToken = response.data.data;
        //console.log('response data handle submit login',response.data)
        signIn({
          token: responseToken,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            email: login?.loginInfo.email,
          },
        });
        navigate("/");
        login?.setLoginInfo({
          ...response.data,
          password: "",
          token: responseToken,
          _id: response.data.id,
        });
        localStorage.setItem("login state", JSON.stringify(response.data));
      });
  };

  return (
    <div className="m-4 flex h-full justify-center bg-white md:w-2/5">
      <ToastContainer />
      <div className="flex w-96 flex-col">
        <h1 className="mt-10 text-center text-5xl font-bold md:text-3xl">
          Bug Tracker
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="mt-28 w-full pb-6 text-2xl font-bold">Sign In</h1>
          <div className="flex w-full flex-col pb-4">
            <label className="font-semibold">Email Address</label>
            <input
              id="email"
              onChange={(e) => handleChange(e)}
              className=" w-full border-b-2 border-gray-500"
            />
          </div>
          <div className="flex w-full flex-col pb-4">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => handleChange(e)}
              className="w-full border-b-2  border-gray-500"
            />
          </div>
          <div className="mb-6 flex">
            <label className="ml-2 w-full">Remember Me</label>
            <input id="checkbox" onChange={handleChecked} type="checkbox" />
          </div>
          <button className="mb-6 h-10 w-full rounded bg-[#1D3557] text-white">
            Log In
          </button>
        </form>
        <p>
          Don't have an account? Sign up
          <span
            onClick={handleClick}
            className="ml-1 cursor-pointer font-bold underline"
          >
            here
          </span>
        </p>

        <h1 onClick={handleDemo} className="cursor-pointer font-bold underline">
          Demo Account
        </h1>
      </div>
    </div>
  );
}
