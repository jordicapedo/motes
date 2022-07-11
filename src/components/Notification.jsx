const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <span className="bg-red-800 text-white px-4 py-2 rounded-full">
      {message}
    </span>
  )
}

export default Notification
