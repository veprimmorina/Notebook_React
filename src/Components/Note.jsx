import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';

function Note({note}) {
    const [notes,setNotes] = useState([]);
    useEffect(()=>{
        if(localStorage.getItem("localNotes")){
            const storedList = JSON.parse(localStorage.getItem("localNotes"));
            setNotes(storedList);
        }
      },[])
      const handleDelete =()=>{
      
            const deleted = notes.filter((t)=>t.noteId !== note.noteId);
            setNotes(deleted);
            localStorage.setItem("localNotes", JSON.stringify(deleted))
            window.location.href='http://localhost:3000';
          
      }
  return (
    <Card className='mt-4 shadow'>
            <Card.Header className='text-center text-primary colored'>Title:{note.title}</Card.Header>
            <Card.Text className='text-center'>{note.description} </Card.Text>
             <Card.Footer> <div className='d-flex justify-content-between text-muted'><p>Category: {note.category}</p><p>{note.noteData}</p></div></Card.Footer>
              <Button variant='danger' className='text-center' onClick={()=>handleDelete(note)}>Delete</Button></Card>
  )
}

export default Note