import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Table } from 'react-bootstrap'
import {  Modal } from 'react-bootstrap'
import 'react-bootstrap-icons';
import MyNote from './MyNote';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';

function HomePage() {
  
   const [showM, setShowM] = useState(false);
   const [category, setCategory] = useState();
   const [description, setDescription] = useState("");
   const [showOther, setShowOther] = useState(false);
   const [data, setData] = useState();
   const [searchedData, setSearchedData]=useState();
   const [note, setNote] = useState("");
   const [notes, setNotes] = useState([]);
   const [successMessage, setSuccessMessage] = useState();
    var newDate = new Date();
    var date=newDate.getDate().toString();
    var month=newDate.getMonth().toString();
    var year = newDate.getFullYear().toString();
    var completeDate = date + "/"+ month+ "/" + year;
  const handleShow = () =>{
       setShowM(true);
       setSuccessMessage("")
  }
  const handleClose = () =>{
    setShowM(false);
}
const getCategory = (val) =>{
  if(val.target.value=="Other"){
  setShowOther(true);
  }else{
    setShowOther(false);
    setCategory(val.target.value);
  }
}
 const getData = (val)=>{
    setData(val.target.value);
 }
 const searchData = () => {
    setSearchedData(data);    
 }


 const saveNote = ()=>{
  if (note) {
    let idNote=description+note+category+completeDate+(note.length+1);
    const newNote = { noteId: idNote,description: description, title: note, category: category, noteData: completeDate };
    setNotes([...notes, newNote]);
    localStorage.setItem("localNotes", JSON.stringify([...notes, newNote]));
    setNote("");
    setSuccessMessage("Succesfully added");
    window.location.href='http://localhost:3000';
  }
 }
 

 useEffect(()=>{
  if(localStorage.getItem("localNotes")){
      const storedList = JSON.parse(localStorage.getItem("localNotes"));
      setNotes(storedList);
      
      
  }
},[])
  return (
    <>
    <div className='colored-background container'>
    <Header />
    <div className='d-flex justify-content-center'>
    <Button variant='success' className=' mt-4' onClick={()=> handleShow()}>Add New Note</Button>
    </div>
    <div className='row mt-5'>
    <div className='col-lg-3 '>
    <Card className='shadow-lg all-notes'>
        <Card.Body className='note-body'>
        <input type="search" id='note-search' placeholder="Search for category" onChange={getData}/>
    <Button variant='primary' onClick={()=>searchData()}><i className="bi bi-search">Search</i></Button>
    <i>*Metting, School, or specific category of 'other' value</i>
    <p className='mt-4 pt-1 note-lead'>All Notes - {notes.length == 0 ? "Currently no note!" : notes.length==1 ? "You have 1 note" : "You have "+notes.length+" notes"}</p>
    
    {notes.map((note) => 
            <Note note={note} key={note.noteId}/>)
            }
            
              
        </Card.Body>
    
    </Card>
    </div>
    <div className='col-lg-9 mt-4 mt-lg-0' >
      <MyNote search={searchedData} notes={notes}/>
    </div>
    </div>
    </div>
    
    <Modal show={showM} onHide={handleClose} className='text-center mt-5'>
  <Modal.Header closeButton>
    <Modal.Title className='text-center'>Add Note</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Label>Note title: </Form.Label>
      <Form.Control type="text" onChange={(e) => setNote(e.target.value)}></Form.Control>
      <Form.Label>Note description: </Form.Label>
      <textarea className='form-control' rows='5' onChange={(e)=> setDescription(e.target.value)}></textarea>
      <Form.Label>Category: </Form.Label>
      <Form.Select onChange={getCategory}>
        <option></option>
        <option value='Metting'>Metting</option>
        <option>School</option>
        <option value="Other">Other...</option>
      </Form.Select>
        
        {showOther && <Form.Control type='text' className='mt-3' onChange={(e)=> setCategory(e.target.value)}></Form.Control>}
      <Form.Label>Date: </Form.Label>
      <Form.Control type="text" value={date+"/"+month+"/"+year} disabled></Form.Control>
    </Form>
  </Modal.Body>
  <Modal.Footer className='text-center'>
    <b className='text-success'> {successMessage}</b>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={()=> saveNote()} type='submit'>
      Save
    </Button>
  </Modal.Footer>
</Modal>
<div className='footer'>
<Footer />
</div>
    </>
  )
}

export default HomePage

