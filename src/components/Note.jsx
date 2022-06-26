export const Note = ({ content, important }) => {
  return (
    <li className="	list-decimal mb-2">
      <div className="flex items-center gap-6">
        <p>{content}</p>
        {important ? (
          <span className="font-bold border-black px-3 py-1 bg-green-300  text-black rounded-md">
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
