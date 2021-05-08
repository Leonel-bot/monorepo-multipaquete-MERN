import axios from 'axios'
export const getAllNotes = () => {
    return axios.get('http://localhost:3001/api/notes/')
    .then(res => {
        const {data} = res
        return data
    })
}