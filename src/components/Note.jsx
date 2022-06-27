export const Note = ({ content, important }) => {
  return (
    <li className="list-decimal mb-2">
      <div className="flex items-center gap-6">
        <p>{content}</p>
        {important ? (
          <span className="rounded-full text-gray-600 bg-gray-300 px-2">
            Important
          </span>
        ) : (
          ''
        )}
      </div>
    </li>
  )
}

export default Note
