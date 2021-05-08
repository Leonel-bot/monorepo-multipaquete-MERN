const { response } = require('express');
const mongoose = require('mongoose')
require('dotenv').config()

const connectionString = process.env.MONGO_DB

mongoose.connect(connectionString , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database connected");
})