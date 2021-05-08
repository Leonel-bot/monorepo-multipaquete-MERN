const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
app.use(express.json())
require('./mongo')
const loginRouter = require('./controllers/login')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const handleError = require('./middlewares/handleError')
const notFound = require('./middlewares/notFound')



app.get('/', (request, response) => {
    response.send('<p>Monorepo multipaquete MERN</p>')
})

app.use('/api/notes' , notesRouter)
app.use('/api/users' , usersRouter)

//login
app.use('/login' , loginRouter)


//middleware
app.use(handleError)
app.use(notFound)


const PORT = process.env.PORT || 3001
app.listen( PORT , () => {
    console.log(`Server on running on port ${PORT}`);
})