import axios from 'axios'

export const createNote = ({ title, body, userId }) => {
  return Promise.reject('something went wrong')
  return axios
    .post('https://jsonplaceholder.typicode.com/posts', { title, body, userId })
    .then(response => {
      const { data } = response
      return data
    })
}
