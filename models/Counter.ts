import mongoose from "mongoose";

const counter = new mongoose.Schema({
    idCounter: { type: Number, required: true, default: 1 },
    name: { type: String, required: true, default: 'default' }
});

export default mongoose.model('Counter', counter);