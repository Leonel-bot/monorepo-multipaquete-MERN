const {Schema , model} = require('mongoose')

const noteSchema = new Schema({
    title : String,
    description : String,
    important : Boolean,
    date : Date,
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})
noteSchema.set('toJSON' , {
    transform : (document , returnObject) => {
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
    }
})

const Note = model('Note' , noteSchema)


module.exports = Note