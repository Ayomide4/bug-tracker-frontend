import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

type loginInfoType = {
  email: string;
  password: string;
  checked: boolean;
  token: string;
  isAdmin: boolean;
  id: string;
  teamLength: number;
};

type contextType = {
  loginInfo: any;
  setLoginInfo: React.Dispatch<React.SetStateAction<loginInfoType>>;
};

const LoginContext = createContext<contextType | null>(null);

export function useLogin() {
  return useContext(LoginContext);
}

const LoginProvider = ({ children }: any) => {
  const [loginInfo, setLoginInfo] = useState<any>({
    // email: '',
    // password: '',
    // checked: false,
    // token: '',
    // isAdmin: false,
    // id: '',
    // teamLength: 0
  });

  const [test, setTest] = useState<any>();

  return (
    <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
