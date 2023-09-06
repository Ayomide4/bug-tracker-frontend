import React, {useState} from 'react'
import { Navbar } from '../components/Navbar'
import { Dashboard } from '../components/DashboardComponents/Dashboard'
import MobileNavbar from '../components/MobileNavbar'


export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className='max-w-full h-screen flex p-0 m-0 z-0 relative bg-[#F4F6F6]'>
      <Navbar isOpen={isOpen}/>
      <MobileNavbar handleClick={handleClick}/>
      <Dashboard/>
    </div>
  )
}
