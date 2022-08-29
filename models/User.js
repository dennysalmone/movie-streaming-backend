const {Schema, model} = require("mongoose")

const schema = new Schema ({
    email:      { type: String , required: true, unique: true },
    password:   { type: String, required: true },
    userName:   { type: String, required: true },
    userId:     { type: Number, required: true, unique: true },
    favourite:  { type: Object }
})

module.exports = model('User', schema)