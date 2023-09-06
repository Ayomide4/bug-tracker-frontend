import { useState } from 'react'
import SelectedTicket from './SelectedTicket'
import Ticket from './Ticket'

export default function Tickets(props: any) {
  const [selected, setSelected] = useState(true)

  function clickItem() {
    setSelected(selected => !selected)
  }

  return (
    <div className='md:w-5/6 h-full bg-[#F4F6F6] flex flex-col items-center'>
      {selected && <Ticket />}
      {!selected && <SelectedTicket/>}
    </div>
  )
}
