import React from 'react';
import { useContext ,useState,useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Delete } from 'lucide-react';
import { NotesContext } from '../context/NotesContext';
import useDebounce from '../hooks/UseDebounce';
import { motion, AnimatePresence } from 'framer-motion';


const Notes = () => {
  const navigate = useNavigate();
  const {notes,deleteItem} = useContext(NotesContext);

  const [searchTerm, setSearchTerm] =useState('');
  const [sortBy, setSortBy] = useState('newest'); // Default sorting by date

  const debouncedSearchTerm= useDebounce(searchTerm,500);


  const filteredNotes =notes.filter((note)=>{
    const lowerCaseSearch =debouncedSearchTerm.toLowerCase();    
    const titleData =note.title.toLowerCase().includes(lowerCaseSearch);
    const descriptionData=note.description.toLowerCase().includes(lowerCaseSearch);
    return titleData || descriptionData;
  })

  const sortedNotes =[...filteredNotes].sort((a,b)=>{
    if(sortBy==='newest'){
      return b.id-a.id; // Newest first (assuming higher ID means newer)
    } else if(sortBy==='oldest'){
      return a.id-b.id; // Oldest first
    }
    else if(sortBy==="a-z"){
      return a.title.localeCompare(b.title); // Alphabetical A-Z
    }
    return 0; // No sorting
  })

  return (
    <div className='max-w-7xl mx-auto mt-12 p-6 min-h-[70vh]'>

      {/* HEADER */}
      <div className='flex justify-between items-end mb-12 border-b border-slate-200 pb-4'>
        <div>
          <h2 className='text-4xl md:text-5xl font-extrabold text-slate-800'>
            Your <span className='text-pink-400'>Notes</span>
          </h2>
          <p className='text-slate-500 mt-2 text-lg'>Capture your thoughts and ideas.</p>
        </div>
      

      {notes && notes.length > 0 && (
        <div className=" mb-2 flex justify-between items-center mt-0.5 mb-6 text-3xl">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border border-gray-300 p-1 rounded-full focus:outline-none'
          />

          <select 
            value={sortBy}
            onChange={(e)=>setSortBy(e.target.value)}
            className='p-1 px-5 border border-slate-300 rounded-full outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sortedNotes cursor-pointer text-slate-700 ml-4 text-1xl'
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
          </select>

        </div>
      )}

        {notes && notes.length > 0 && (
          <NavLink
            to="/create"
            className='hidden sm:flex px-6 py-2.5 mb-8.5 bg-orange-100 text-orange-700 font-semibold rounded-full hover:bg-orange-200'
          >
            + New Note
          </NavLink>
        )}

      </div>


      {/* EMPTY STATE */}
      {!notes || notes.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-16 p-10 bg-orange-50/50 rounded-[2rem] border-2 border-dashed'>
          <div className='text-7xl mb-6'>✍️</div>
          <h3 className='text-2xl font-bold text-slate-700 mb-3'>No notes yet!</h3>
          <NavLink
            to="/create"
            className='px-8 py-3 bg-orange-500 text-white rounded-full'
          >
            Create Your First Note
          </NavLink>
        </div>
      ) : 

      sortedNotes.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-16 p-10 bg-orange-50/50 rounded-[2rem] border-2 border-dashed'>
          <div className='text-7xl mb-6'>🔍</div>
          <h3 className='text-2xl font-bold text-slate-700 mb-3'>No matching notes found!</h3>
          <p className='text-slate-500'>Try adjusting your search criteria.</p>
          <button
            onClick={() => setSearchTerm('')}
            className='px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600'
          >
            Clear Search
          </button>
        </div>
      ) :
      
      (

<motion.div 
  layout // Smoothly repositions remaining cards when one is deleted
  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
>
  <AnimatePresence mode='popLayout'>
    {sortedNotes.map((note, index) => (
      <motion.div
        key={note.id}
        layout
        // 1. Entry Animation: Fade in and slide up
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // 2. Exit Animation: Scale down and fade out on delete
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        // 3. Stagger logic: Delay based on index
        transition={{ delay: index * .055 }}
        
        className='group relative bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden'
      >
        {/* Subtle background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* CONTENT (Relative to stay above glow) */}
        <div className="relative z-10">
          <button
            onClick={() => navigate(`/edit/${note.id}`)}
            className='absolute -top-1 -right-1 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100'
          >
            ✍️
          </button>

          <h3 className='text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors'>
            {note.title}
          </h3>

          <p className='text-slate-600 line-clamp-3 mb-4'>
            {note.description}
          </p>

          <div className='mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-sm'>
            <span className='text-slate-400 font-medium'>
              {note.date}
            </span>

            <motion.button
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteItem(note.id)}
              className='text-slate-300 hover:text-red-500 p-1'
            >
              <Delete />
            </motion.button>
          </div>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>





       )}
    </div>
  );
};

export default Notes;