const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()


loginRouter.post('/' , async (request, response) => {
    const {body} = request
    const {username, password} = body

    const user = await User.findOne({username})

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if(!(passwordCorrect || user)){
        response.status(401).json({error : "Incorrect username or password"})
    }

    const userToken = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(userToken, process.env.SECRET_TOKEN , {expiresIn : 60*60*24*7})

    response.status(402).json({
        name: user.name,
        username: user.username,
        token
    })

})



module.exports = loginRouter