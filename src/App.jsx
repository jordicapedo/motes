import './main.css'
import { Note } from './components/Note'
import { useEffect, useState } from 'react'
//import { getAll as getAllNotes, create as createNote } from './services/notes'
import noteService from './services/notes'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Togglabe from './components/Togglabe'

export default function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isImportant, setIsImportant] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // useEffect -> Es como una función que quiero que se
  // ejecute cada vez que se renderiza mi componente
  // fectch -> Es una función que me permite hacer una petición a una API
  {
    /*
useEffect(() => {
    setTimeout(() => {
      setLoading(true)
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
          setNotes(json)
          setLoading(false)
        })
    }, 2000)
  }, []) -> El segundo parámetro es un array vacío, porque no quiero que se ejecute 1 vez cuando se renderiza el componente
*/
  }

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

  const handleChange = event => {
    setNewNote(event.target.value)
  }

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: isImportant
    }

    setError('')
    noteService
      .create(noteObject)
      .then(newNote => {
        setNotes(prevNotes => prevNotes.concat(newNote))
      })
      .catch(error => {
        console.log(error)
        setError('The note was not created')
      })

    //setNotes(notes.concat(noteToAddToState)) // .push() no crea un aaray nuevo si no mutar el original
    setNewNote('')
    setIsImportant(false)
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log(user)

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const renderCreateNoteForm = () => (
    <form onSubmit={addNote} className="mb-4">
      <div className="mb-2">
        <input
          className="rounded-full border-1 border-gray-800 px-4 py-1 mr-2 mb-4 focus:border-orange-500 focus:ring-transparent"
          type="text"
          onChange={handleChange}
          value={newNote}
        />
        <button className="bg-gray-800 text-gray-200 px-4 py-1 rounded-full mr-2">
          Create note
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-gray-200 px-4 py-1 rounded-full"
        >
          Logout
        </button>
      </div>
      <label className="mr-4">Is important?</label>
      <input
        className="border-black rounded-md p-2 text-gray-800 focus:ring-transparent"
        type="checkbox"
        onChange={() => setIsImportant(() => !isImportant)}
        checked={isImportant}
      />
      {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
    </form>
  )

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

          <Togglabe>children</Togglabe>

          {user ? (
            renderCreateNoteForm()
          ) : (
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
              errorMessage={errorMessage}
            />
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
