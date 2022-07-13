import './main.css'
import { Note } from './components/Note'
import { useEffect, useState } from 'react'

import noteService from './services/notes'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

export default function App() {
  const [notes, setNotes] = useState([])

  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  // useEffect -> Es como una función que quiero que se ejecute cada vez que se renderiza mi componente
  // fectch -> Es una función que me permite hacer una petición a una API

  useEffect(() => {
    setLoading(true)
    noteService.getAll().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const addNote = noteObject => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
      .catch(error => {
        console.log(error)
        setErrorMessage('The note was not created')
      })

    //setNotes(notes.concat(noteToAddToState)) // .push() no crea un aaray nuevo si no mutar el original
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  const handleLogin = user => {
    setUser(user)
  }

  return (
    <div className="flex gap-6 font-sans m-5">
      <div>
        <h1 className="text-2xl font-bold mb-2">📓 </h1>
      </div>
      <div>
        <div className="mb-10">
          <p className="text-2xl text-gray-800 font-bold mb-2">
            Motes is a simple note app made by myself (Jordi Capellades)
          </p>
          <p className="text-gray-600 mb-6">
            For made this app I used the following technologies: React,
            React-Hooks and Tailwindcss.
          </p>

          {user ? (
            <NoteForm addNote={addNote} handleLogout={handleLogout} />
          ) : (
            <LoginForm handleLogin={handleLogin} />
          )}

          <button
            onClick={handleShowAll}
            className="bg-gray-800 text-gray-200 px-4 py-1 rounded-full"
          >
            {showAll ? 'Show only important' : 'Show all'}
          </button>
        </div>
        {loading ? 'Loading...' : ''}
        <div className="mb-10 ml-5">
          <ul>
            {typeof notes === 'undefined' || notes.length === 0 ? (
              <li>Nothing to show</li>
            ) : (
              notes
                .filter(note => {
                  if (showAll === true) return note
                  return note.important === true
                })
                .map(note => (
                  <Note
                    key={note.id}
                    content={note.content}
                    important={note.important}
                  />
                ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
