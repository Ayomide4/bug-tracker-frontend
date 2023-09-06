import { useState } from 'react'
import {AiOutlineRight, AiOutlineDown} from 'react-icons/ai'

export const DropdownMenu = (props:any) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [btnTitle, setBtnTitle] = useState('- Select -') 
  

  const handleClick = (e:any) => {
    const value = e.target.getAttribute('value')
    
    if(props.listType === 'status'){
      setBtnTitle(value) //change btn so title isn;t set for all drop components
      props.setDropdownValue( {...props.dropdownValue, status: value})
    } 
    else if(props.listType === 'prio') {
      setBtnTitle(value) //change btn so title isn't set for all drop components
      props.setDropdownValue({...props.dropdownValue, prio: value})
    } 
    else {
      setBtnTitle(value)
    }
    setIsExpanded(false)
  }

  return (
    <>
      <h1 className='text-lg mb-2'>{props.title}</h1>
      <div className='border border-gray-500 rounded-sm'>
        <button type='button' onClick={() => {setIsExpanded(prev => !prev)}} className='bg-white w-32 h-10 py-1 flex justify-center items-center'>
          <div className='mr-1'>{btnTitle /* change title when dropdown value changes*/}</div> 
          <div>
            {!isExpanded && <AiOutlineRight/>}
            {isExpanded && <AiOutlineDown/>}
          </div>
        </button>
          {isExpanded &&  //display dropdown contents
            <div>
              <hr className='border-1 border-black'></hr>
              <ul className='z-10'>
                {props.list.map((item: string, index: number) => {
                  return (
                    <li value={item} onClick={(e:any) => {handleClick(e)}} className='cursor-pointer hover:bg-blue-500 hover:text-white p-1 bg-white' key={index}>
                      {item}
                    </li>
                  )
                })}
              </ul>
            </div>
          }
      </div>
    </>
  )
}

export default DropdownMenu