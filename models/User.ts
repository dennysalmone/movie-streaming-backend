import mongoose from "mongoose";

const user = new mongoose.Schema({
    email:      { type: String , required: true, unique: true },
    password:   { type: String, required: true },
    userName:   { type: String, required: true },
    userId:     { type: Number, required: true, unique: true },
    favourite:  { type: Object }
});

export default mongoose.model('User', user);