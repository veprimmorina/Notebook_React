import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

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
  <p className='text-center note-lead'>School Category</p>{<table className='table table-dark shadow'>
    {school!="" ? <thead className='thead-light'><tr><th>Title</th><th>Description</th><th>Date:</th></tr></thead> : ""}
  {school.map((note)=> <><tbody><tr key={note} className=' border-bottom'><td>{note.title}</td><td className=''>{note.description}</td>
  <td>{note.noteData}</td></tr></tbody></>)}
  </table>}
  <p className='mt-4 text-center note-lead'>Metting Category</p>
  {<table className='table table-dark shadow'>{metting!="" ? <thead className='thead-light'><tr><th>Title</th><th>Description</th><th>Date:</th></tr></thead> : ""}
 {metting.map((note)=> <><tbody><tr key={note} className=' border-bottom'><td>{note.title}</td><td className=''>{note.description}</td><td>{note.noteData}</td></tr></tbody></>)}
  </table>}
  <p className='text-center note-lead'>Other Category</p>
  {<table className='table table-dark shadow'>{other!="" ? <thead className='thead-light'><tr><th>Title</th><th>Description</th><th>Date:</th><th>Category: </th></tr></thead> : ""}
 {other.map((note)=> <> <tbody><tr key={note} className=' border-bottom'><td>{note.title}</td><td className=''>{note.description}</td><td>{note.noteData}</td><td>{note.category}</td></tr></tbody></>)}
  </table>}
  </>:<><table className='table table-dark shadow'>
  <thead className='thead-light'><tr><th>Title</th><th>Description</th><th>Date:</th></tr></thead>
   {notes.map((note)=>(note.category==search ? <tbody><tr key={note} className=' border-bottom'><td>{note.title}</td><td>{note.description}</td><td>{note.noteData}</td></tr> </tbody>: ""))}</table></>}
    </Card.Body>
    </Card>
  )
}

export default MyNote