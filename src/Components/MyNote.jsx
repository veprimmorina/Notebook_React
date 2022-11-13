import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import NotesTable from './NotesTable';
import TableHeader from './TableHeader';


function MyNote({search}) {
  const [notes, setNotes] = useState([]);
  const [school, setSchool] = useState([])
  const [metting, setMetting] = useState([])
  const [other, setOther] = useState([]);
  const [categorizeButton, setCategorizeButton] = useState(true);
 
  useEffect(()=>{
    if(localStorage.getItem("localNotes")){
        const storedList = JSON.parse(localStorage.getItem("localNotes"));
        setNotes(storedList); 
      } 
  },[])

const categorize = () => {
  notes.map((note)=>(note.category=="School" ? setSchool(school=>[...school,note]) : note.category=="Metting" ? 
  setMetting(metting=>[...metting,note]): note.category!="School"&&note.category!="Metting" ? setOther(other=>[...other,note]) : "" )) 
  setCategorizeButton(false)
}

  return (
   <Card className='shadow-lg'>
    <Card.Body>
     <p className='note-lead'>My Note</p>
     {!categorizeButton && <p className='lead'>Category / {search != undefined ? search : "All"}</p>}
     { categorizeButton && <Button variant='warning' onClick={()=>categorize()}>Categorize</Button>}

     { search==undefined  ? <> 
     <p className='text-center note-lead'>School Category</p>
     <table className='table table-dark shadow'>
     {school!="" ? <TableHeader /> : ""}
     {
     school.map((note)=> 
     <NotesTable key={note.noteId} note={note}/>
     )}

     </table>
     <p className='mt-4 text-center note-lead'>Metting Category</p>
    <table className='table table-dark shadow'>
      {metting!="" ? <TableHeader />: ""}
      {metting.map((note)=> 
      <NotesTable key={note.noteId} note={note}/>
    )}
    </table>
    <p className='text-center note-lead'>Other Category</p>
    <table className='table table-dark shadow'>
    {other!="" ? <TableHeader />: ""}
    {other.map((note)=> 
    <NotesTable key={note.noteId} note={note} />
    )}
    </table>
    </>:<><table className='table table-dark shadow'>
    <TableHeader />
    {notes.map((note)=>
    (note.category==search ? <NotesTable key={note.noteId} note={note} />: ""
    ))}
    </table></>}
   </Card.Body>
  </Card>
  )
}

export default MyNote