import {RiLogoutBoxRLine} from 'react-icons/ri'
import {useSignOut} from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const signOut = useSignOut()
  const navigate = useNavigate()
  const logout = () => {
    signOut()
    navigate('/login')
  }

  return (
    <div className='w-full h-10 mt-80 mx-2'>
      <div className='cursor-pointer flex items-center w-32'  onClick={logout}>
        <RiLogoutBoxRLine color='white' size={30}/> 
        <h1 className='font-semibold text-lg ml-2 text-white'>Logout</h1>
      </div>
    </div>

  )
}
