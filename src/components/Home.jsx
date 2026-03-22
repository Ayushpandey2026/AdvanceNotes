import React from 'react';
import { NavLink } from 'react-router-dom';
const Home = () => {
  
  const direct=()=>{
    window.location.href='/notes';
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] px-4 font-sans'>
      
      <div className='text-center max-w-2xl mb-50 '>
        
        {/* Main Title */}
      
        
        {/* Subtitle */}
        <h3 className='text-2xl md:text-3xl text-slate-800 font-semibold mb-6'>
          Create whatever comes to your mind.
        </h3>
        
        {/* Short Text Paragraph */}
        <p className='text-lg md:text-xl text-slate-500 mb-10 leading-relaxed'>
          A simple, fast, and secure place to capture your daily thoughts, 
          organize your tasks, and boost your productivity without any distractions.
        </p>
        
        {/* Simple Navlinks */}
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <NavLink to='/create' className='px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-md'>
            Get Started Free
          </NavLink>

            <NavLink to="/notes" className='px-8 py-3 bg-white text-orange-500 font-bold rounded-full border border-orange-200 hover:bg-orange-50 transition-colors shadow-sm'>
              View My Notes
            </NavLink>
            </div>

      </div>

    </div>
  );
}

export default Home;