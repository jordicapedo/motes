import { useState } from 'react'
import noteService from '../services/notes'
import loginService from '../services/login'
import Notification from './Notification'

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)

      handleLogin(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setError('Wrong credentials')

      setTimeout(() => {
        setError(null)
        return null
      }, 5000)
    }
  }

  return (
    <div>
      <div>
        <form className="mb-4" onSubmit={handleSubmit}>
          <input
            className="rounded-full px-4 py-1 mr-2"
            type="text"
            value={username}
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            className="rounded-full px-4 py-1 mr-2"
            type="password"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button className="bg-gray-800 text-gray-200 px-4 py-1 mr-2 rounded-full">
            Login
          </button>
          <Notification message={error} />
        </form>
      </div>
    </div>
  )
}
