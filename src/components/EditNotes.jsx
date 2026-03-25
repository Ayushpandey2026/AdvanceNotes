import { useEffect,useContext} from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../context/NotesContext";

const EditNotes=()=>{
    const {notes,updatedItem} =useContext(NotesContext);
    const {id} =useParams();
    const navigate=useNavigate();

    const notesToEdit =notes.find((note)=> note.id===Number(id));

    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [date,setDate]=useState('');

    useEffect(()=>{
        if(notesToEdit){
            setTitle(notesToEdit.title);
            setDescription(notesToEdit.description);
            setDate(notesToEdit.date);
        }
    },[id,notesToEdit]);

    const handleSubmit=((e)=>{
        e.preventDefault();
        updatedItem(Number(id),{title,description,date});
        navigate('/notes');

    })

   return (
    <div className="max-w-xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 rounded"
        />

        <button className="bg-blue-500 text-white p-2 rounded">
          Update Note
        </button>

      </form>
    </div>
  );
};


export default EditNotes;


