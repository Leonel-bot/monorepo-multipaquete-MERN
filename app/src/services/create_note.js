import axios from 'axios'
export const createNote = (newNote) => {
    return axios.post('http://localhost:3001/api/notes/' , newNote)
    .then(res => {
        const {data} = res
        return data
    })
    
}