import React, { useContext } from 'react'
import { useState } from 'react';
import { NotesContext } from '../context/NotesContext';

const CreateNotes = () => {

    const {addNote}= useContext(NotesContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const formattedDate = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(title.trim()==='' || description.trim()==='') return alert('Please fill in both fields!');

        addNote({
            id: Date.now(), // Unique ID for the note
            title,
            description,
            date: formattedDate
        });

        setTitle('');
        setDescription(''); 
    }

  return (
   <div className='max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-slate-100'>
  
  <h2 className='text-3xl font-bold text-slate-800 mb-8 text-center'>Add a Note</h2>
  
  <form onSubmit={handleSubmit} action="POST" className='flex flex-col gap-5'>
    
    {/* Title Input Group */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="title" className='font-semibold text-slate-700'>
        Title: 
      </label>
      <input 
        id="title"
        type="text"
        placeholder="Enter note title..." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}  
        className='w-full p-3 border border-slate-300 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-slate-800'
      />
    </div>
      
    {/* Description Input Group */}
    <div className='flex flex-col gap-2'>
      <label htmlFor="description" className='font-semibold text-slate-700'>
        Description: 
      </label>
      {/* Tip: You might want to change this to a <textarea> later for multi-line notes! */}
      <input 
        id="description"
        type="text"
        placeholder="Enter note description..." 
        value={description}
        onChange={(e) => setDescription(e.target.value)}  
        className='w-full p-3 border border-slate-300 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-slate-800'
      />
    </div>

    

    {/* Submit Button */}
    <button 
      type="submit" 
      className='mt-4 w-full py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 hover:-translate-y-0.5 transition-all shadow-md cursor-pointer'
    >
      Submit
    </button>

  </form>

</div>
  )
}

export default CreateNotes
