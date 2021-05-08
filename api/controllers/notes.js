const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const getToken = require('../services/getToken')

notesRouter.post('/' , async (request , response) => {
    const {body} = request
    const {title, description, important,} = body
    
    
    const token = getToken(request)
    
    let decodeToken = {}
    try {
        decodeToken = jwt.verify(token, process.env.SECRET_TOKEN)
    } catch{}

    console.log(decodeToken.id);
    if(!decodeToken.id || !token){
        response.status(401).json({error : 'token missing or invalid'})
    }


    const {id} = decodeToken
    const user = await User.findById(id)


    if(user){
        const newNote = new Note({
            title,
            description,
            important,
            user : user._id

        })
        newNote.save()
        .then(note => {
            user.notes = user.notes.concat(note)
            user.save()
            response.json(note)
        })
    }
    
})

notesRouter.get('/' , (request, response) => {
    Note.find({}).populate('user' ,{
        name: 1,
        username: 1,
    })
    .then(notes => {
        response.json(notes)
    })
})

notesRouter.get('/:id' , (request , response , next) => {
    const {id} = request.params
    Note.findById(id)
    .then(note => {
        response.json(note)
    })
    .catch(error => {
        next(error)
    })
})

notesRouter.put('/:id' , (request , response , next)  => {
    const {id} = request.params
    const {title,description,important} = request.body

    const noteUpdate = {
        title,
        description,
        important
    }
    
    Note.findByIdAndUpdate(id, noteUpdate , {new:true})
    .then(note => {
        response.json(note)
    })
    .catch(error => {
        next(error)
    })
})

notesRouter.delete('/:id' , (request , response , next) => {
    const {id} = request.params
    Note.findByIdAndRemove(id)
    .then(() => {
        response.status(204).end()
        console.log('Content deleted');
    })
    .catch(error => {
        next(error)
    })
})


module.exports = notesRouter