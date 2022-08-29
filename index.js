const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const PORT = process.env.PORT || 3000;
const app = express();
const auth = require('./middleware/auth.js');
const mongoURL = 'mongodb+srv://dennysalmone777:dennysalmone7771@clusterdenny.pedk5.mongodb.net/movies';

app.use(auth);
app.use(usersRoutes);
app.use(moviesRoutes);

async function start() {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT} port...`)
        })
    } catch (e) {
        console.log(e)
    }
}

start();