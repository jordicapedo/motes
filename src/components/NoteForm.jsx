import { useState } from 'react'

export default function NoteForm({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')
  const [isImportant, setIsImportant] = useState(false)
  const [error, setError] = useState('')

  const handleChange = event => {
    setNewNote(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: isImportant
    }

    addNote(noteObject)
    setNewNote('')
    setIsImportant(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
}
