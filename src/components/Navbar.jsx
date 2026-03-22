import React from 'react'
import NotepadText from 'lucide-react/dist/esm/icons/notepad-text.js'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
    <div className='ml-5 mt-5 mr-10 font-bold text-blue-500 py-3 flex items-center justify-between text-2xl'>
          <NotepadText size={50} strokeWidth={2.5} />

    <div className='flex items-center gap-10'>
       <NavLink to='/notes'>Notes</NavLink>
       <NavLink to='/create'>CreateNotes</NavLink>
    </div>
    </div>

    </>
  )
}

export default Navbar
