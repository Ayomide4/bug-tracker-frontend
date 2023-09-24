import React from "react";
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
  const [loading, setLoading] = useState(false);
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
      setLoading(true);

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
          navigate("/dashboard");
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
            setLoading(false);
          }
          if (error.response.data.error === "user not found") {
            setLoading(false);
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
    setLoading(true);

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
        navigate("/dashboard");
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

      {loading && (
        <div
          role="status"
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-20 w-20 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1E429F"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

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
