import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import usersRoutes from './routes/login';
import registerRoutes from './routes/register';
import moviesRoutes from './routes/favs';
import favsRoutes from './routes/get-favs';
import auth from './middleware/auth';
import { mongoURL } from './assets/environment';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(auth);
app.use(usersRoutes);
app.use(registerRoutes);
app.use(favsRoutes);
app.use(moviesRoutes);

async function start() {
    try {
        mongoose.connect(mongoURL)
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT} port...`)
        })
    } catch (e) {
        console.log(e)
    }
}

start();