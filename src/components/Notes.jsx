import React from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Delete } from 'lucide-react';
import { NotesContext } from '../context/NotesContext';

const Notes = () => {
  const navigate = useNavigate();
  const {notes,deleteItem} = useContext(NotesContext);

  return (
    <div className='max-w-7xl mx-auto mt-12 p-6 min-h-[70vh]'>

      {/* HEADER */}
      <div className='flex justify-between items-end mb-12 border-b border-slate-200 pb-4'>
        <div>
          <h2 className='text-4xl md:text-5xl font-extrabold text-slate-800'>
            Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400'>Notes</span>
          </h2>
          <p className='text-slate-500 mt-2 text-lg'>Capture your thoughts and ideas.</p>
        </div>

        {notes && notes.length > 0 && (
          <NavLink
            to="/create"
            className='hidden sm:flex px-6 py-2.5 bg-orange-100 text-orange-700 font-semibold rounded-full hover:bg-orange-200'
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
      ) : (

        // NOTES GRID
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {notes.map((note) => (
            <div
              key={note.id}
              className='relative bg-white p-6 rounded-3xl shadow-sm border hover:shadow-lg transition'
            >

              {/* 🔥 EDIT BUTTON (TOP RIGHT) */}
              <button
                onClick={() => navigate(`/edit/${note.id}`)}
                className='absolute top-3 right-3 text-slate-400 hover:text-blue-500 text-sm font-semibold cursor-pointer'
              >
                 ✍️
              </button>

              {/* TITLE */}
              <h3 className='text-xl font-bold text-slate-800 mb-3'>
                {note.title}
              </h3>

              {/* DESCRIPTION */}
              <p className='text-slate-600 flex-grow'>
                {note.description}
              </p>

              {/* FOOTER */}
              <div className='mt-6 pt-4 border-t flex justify-between items-center text-sm'>
                <span className='text-slate-400'>
                  {note.date}
                </span>

                {/* DELETE */}
                <button
                  onClick={() => deleteItem(note.id)}
                  className='text-slate-300 hover:text-red-500'
                >
                 <Delete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;