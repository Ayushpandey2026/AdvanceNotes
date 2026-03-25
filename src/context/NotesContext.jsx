import React, { useState,useEffect,createContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage';

export const NotesContext=createContext();

export const NotesProvider=({children})=>{

    const[notes,setNotes]=useLocalStorage('notes',[]);

       const addNote=(newNotes)=>{
            setNotes([...notes,newNotes])
       }

       const deleteItem=(id)=>{
            setNotes(notes.filter((note)=>note.id!==id));
       }

       const updatedItem=(id,updatedNotes)=>{
        const mappeddata =notes.map((note)=>(note.id===id ? {...note,...updatedNotes} : note))
        setNotes(mappeddata);
       }

       return(

                <NotesContext.Provider value={{notes,addNote,deleteItem,updatedItem}}>
                    {children}
                </NotesContext.Provider>
       )
    }

