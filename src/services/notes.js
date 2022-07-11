import axios from 'axios'
// const baseUrl = 'https://secret-beach-24109.herokuapp.com/api/notes/'
const baseUrl = 'http://localhost:3001/api/notes/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const create = newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const config = {
    Authorization: token
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
