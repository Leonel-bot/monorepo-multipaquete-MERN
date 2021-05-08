import axios from 'axios'
export const deleteNote = (id) => {
    return axios.delete(`http://localhost:3001/api/notes/${id}`)
}