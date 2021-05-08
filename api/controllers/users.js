const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { response } = require('express')
const { lowerFirst } = require('lodash')
const Note = require('../models/Note')
const User = require('../models/User')



usersRouter.post('/' , async (request, response) => {
    const {body} = request
    const {name,username,password,} = body

    const existsUser = await User.findOne({username})

    if(existsUser){
        return response.status(404).json({error : 'Existing user'})
    }
    const passwordHash = await bcrypt.hash(password , 10)
    const newUser = new User({
        name,
        username,
        passwordHash,
    })
    newUser.save().then(user => {
        response.json(user)
    })

})


usersRouter.get('/' , (request, response) => {
    User.find({})
    .then(notes => {
        response.json(notes)
    })
})

usersRouter.get('/:id' , (request, response, next) => {
    const {id} = request.params
    User.findById(id)
    .then(user => {
        response.json(user)
    })
    .catch(error => {
        next(error)
    })
})

usersRouter.delete('/:id' , (request , response, next) => {
    const {id} = request.params
    User.findByIdAndRemove(id)
    .then(() => {
        response.status(204).end()
        console.log('Content deleted');
    })
    .catch(error => {
        next(error)
    })
})





module.exports = usersRouter