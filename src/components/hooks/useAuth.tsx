import React from 'react'
import { useLogin } from '../../LoginProvider'

const useAuth = () => {
  const login = useLogin()
  const token = login?.loginInfo.token
  const email = login?.loginInfo.email
  const isAdmin = login?.loginInfo.email

  if(token){
    
  }

  return {email: '', isAdmin}
}

export default useAuth