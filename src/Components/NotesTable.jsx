import React from 'react'

function NotesTable({note}) {
  
  return (
    <tbody>
        <tr key={note} className=' border-bottom'>
            <td>{note.title}</td>
            <td>{note.description}</td>
            <td>{note.noteData}</td>
            <td>{note.category}</td>
        </tr>
    </tbody>
  )
}

export default NotesTable