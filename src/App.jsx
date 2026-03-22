// src/App.jsx
import { useEffect, useState } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Notes from './components/Notes';
import CreateNotes from './components/CreateNotes';
import EditNotes from './components/EditNotes';
import { NotesProvider } from './context/NotesContext';

function App() {
  // Your Notes App code...
  return (
    <NotesProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/notes' element={<Notes />}/>
        <Route path='/create' element={<CreateNotes  />}/>
        <Route path='/edit/:id' element={<EditNotes/>}/>
      </Routes>
    </Router>
   </NotesProvider>

  );
}


export default App; 
