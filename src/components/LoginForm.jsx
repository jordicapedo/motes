import { useState } from 'react'
import Notification from './Notification'

export default function LoginForm({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  errorMessage
}) {
  const [loginVisible, setLoginVisible] = useState(false)

  return (
    <div>
      <div>
        <form className="mb-4" onSubmit={handleSubmit}>
          <input
            className="rounded-full px-4 py-1 mr-2"
            type="text"
            value={username}
            placeholder="Username"
            onChange={handleUsernameChange}
          />
          <input
            className="rounded-full px-4 py-1 mr-2"
            type="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <button className="bg-gray-800 text-gray-200 px-4 py-1 mr-2 rounded-full">
            Login
          </button>
          <Notification message={errorMessage} />
        </form>
      </div>
    </div>
  )
}
