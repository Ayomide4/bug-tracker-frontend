import React from 'react'
import { Navbar } from '../components/Navbar'
import Projects from '../components/ProjectComponents/Projects'
import MobileNavbar from '../components/MobileNavbar'
import { useState } from 'react'


export default function ProjectPage() {
  const [hidden, setHidden] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className=' md:max-w-full h-screen flex p-0 m-0 bg-[#F4F6F6]'>
      <Navbar isOpen={isOpen}/>
      <div className='flex flex-col justify-between w-full md:w-5/6 md:max-h-screen bg-[#F2F5FA] '>
        <Projects setHidden={setHidden} hidden={hidden}/> 
      </div>
      <MobileNavbar hidden={hidden} handleClick={handleClick}/>
    </div>
    
  )
}
