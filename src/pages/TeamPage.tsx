import MobileNavbar from '../components/MobileNavbar'
import { Navbar } from '../components/Navbar'
import Teams from '../components/TeamComponents/Teams'
import { useState } from 'react'

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hidden, setHidden] = useState<boolean>(false)

  const handleClick = () => {
    setIsOpen(prev => !prev)
  }


  return (
    <div className='max-w-full h-screen flex p-0 m-0 bg-[#F4F6F6]'>
      <Navbar isOpen={isOpen}/>
      <div className='flex flex-col justify-between w-5/6 max-h-screen bg-[#F2F5FA] '>
        <Teams setHidden={setHidden} hidden={hidden}/>
      </div>
      <MobileNavbar hidden={hidden} handleClick={handleClick} />
    </div>
  )
}
