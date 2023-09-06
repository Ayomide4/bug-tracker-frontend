import React, {useState} from 'react'
import { Navbar } from '../components/Navbar'
import Ticket from '../components/TicketComponents/Tickets'
import MobileNavbar from '../components/MobileNavbar'



export default function TicketPage(){
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className='max-w-full h-full md:h-screen flex p-0 m-0 bg-[#F4F6F6]'>
      <Navbar isOpen={isOpen}/>
      <MobileNavbar handleClick={handleClick}/>
      <Ticket/>
    </div>
  )
}
