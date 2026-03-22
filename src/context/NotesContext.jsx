import React, { useState,useEffect,createContext } from "react";

export const NotesContext=createContext();

export const NotesProvider=({children})=>{

    const[notes,setNotes]=useState(()=>{

       const savedNotes= localStorage.getItem('notes');
       if(savedNotes){
        return JSON.parse(savedNotes);
       }
       else{
        return []
       }
    })


       useEffect(()=>{
        localStorage.setItem('notes',JSON.stringify(notes));
       },[notes]);

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

