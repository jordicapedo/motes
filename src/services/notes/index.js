import axios from 'axios'
const baseUrl = 'https://secret-beach-24109.herokuapp.com/api/notes/'

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
