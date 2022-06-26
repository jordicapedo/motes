import './main.css'
import { Note } from './components/Note'
import { useEffect, useState } from 'react'
import { getAll as getAllNotes, create as createNote } from './services/notes'

export default function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isImportant, setIsImportant] = useState(false)

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
    getAllNotes().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  const handleChange = event => {
    setNewNote(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const noteToAddToState = {
      content: newNote,
      important: isImportant
    }

    setError('')
    createNote(noteToAddToState)
      .then(newNote => {
        setNotes(prevNotes => prevNotes.concat(newNote))
      })
      .catch(error => {
        console.log(error)
        setError('La nota no se pudo crear')
      })

    //setNotes(notes.concat(noteToAddToState)) // .push() no crea un aaray nuevo si no mutar el original
    setNewNote('')
    setIsImportant(false)
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  return (
    <div>
      <div className="flex items-center justify-center flex-col gap-4 mb-6">
        <h1 className="text-4xl font-bold">Notes</h1>
        <button
          onClick={handleShowAll}
          className="px-3 py-1 border-[0.2rem] border-black rounded-md"
        >
          {showAll ? 'Show only important' : 'Show all'}
        </button>
      </div>
      {loading ? 'Loading...' : ''}
      <div className="flex items-center justify-center mb-6">
        <ol>
          {typeof notes === 'undefined' || notes.length === 0
            ? 'No tenemos notas de mostrar'
            : notes
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
                ))}
        </ol>
      </div>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <input
            className="border-[0.2rem] border-black rounded-md px-3 py-1 mr-4 focus:border-black focus:ring-transparent"
            type="text"
            onChange={handleChange}
            value={newNote}
          />
          <button className="px-3 py-1 rounded-md border-[0.2rem] border-black mr-4">
            Crear nota
          </button>
          <label className="mr-2">Is important?</label>
          <input
            className="border-[0.2rem] border-black rounded-md p-3 text-green-300 focus:ring-transparent"
            type="checkbox"
            onChange={() => setIsImportant(() => !isImportant)}
            checked={isImportant}
          />
        </form>
        {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
      </div>
    </div>
  )
}
