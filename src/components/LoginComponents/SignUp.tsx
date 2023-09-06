import axios from "axios";
import React, { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  notify: (type: string) => void;
}

interface signUpType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export default function SignUp({ setTrigger, notify }: Props) {
  const [signUpInfo, setSignUpInfo] = useState<signUpType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const blankData: signUpType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: false,
  };

  const newData: any = { ...signUpInfo };
  const handleChange = (e: any) => {
    newData[e.target.id] = e.target.value;
    setSignUpInfo(newData);
  };

  const handleClick = () => {
    setTrigger((prev) => !prev);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    //TODO: form validation
    if (
      signUpInfo.firstName === "" ||
      signUpInfo.lastName === "" ||
      signUpInfo.email === "" ||
      signUpInfo.password === ""
    ) {
      notify("input");
    } else {
      axios
        .post("https://bug-tracker-f329.onrender.com/register", signUpInfo)
        .then(async () => {
          setTrigger((prev) => !prev);
        })
        .catch(function (error) {
          if (error.response) {
            setSignUpInfo(blankData);
            notify("email taken");
          }
        });
    }
  };

  return (
    <div className="m-4 flex h-full justify-center bg-white md:w-2/5">
      <ToastContainer />
      <div className="flex w-96  flex-col">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="mt-44 w-full pb-6 text-2xl font-bold">
            Create account
          </h1>
          <div className="flex w-full flex-col pb-4">
            <label className="font-semibold">First Name</label>
            <input
              id="firstName"
              type="text"
              onChange={(e) => handleChange(e)}
              value={signUpInfo.firstName}
              className=" w-full border-b-2 border-gray-500"
            />
          </div>
          <div className="flex w-full flex-col pb-4">
            <label className="font-semibold">Last Name</label>
            <input
              id="lastName"
              type="text"
              onChange={(e) => handleChange(e)}
              value={signUpInfo.lastName}
              className=" w-full border-b-2 border-gray-500"
            />
          </div>
          <div className="flex w-full flex-col pb-4">
            <label className="font-semibold">Email Address</label>
            <input
              id="email"
              type="email"
              onChange={(e) => handleChange(e)}
              value={signUpInfo.email}
              className=" w-full border-b-2 border-gray-500"
            />
          </div>
          <div className="flex w-full flex-col pb-10 md:pb-4">
            <label className="font-semibold">Password</label>
            <input
              id="password"
              onChange={(e) => handleChange(e)}
              type="password"
              value={signUpInfo.password}
              className="w-full border-b-2  border-gray-500"
            />
          </div>
          <button className="mb-6 h-10 w-full rounded bg-[#1D3557] text-white">
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <span
            className="cursor-pointer font-bold underline"
            onClick={handleClick}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
