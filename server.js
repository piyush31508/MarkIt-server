import express from 'express';
import dotenv from 'dotenv';
import connect from './database/db.js';
import noteRoutes from './routes/notes.js';
import bookmarkRoutes from './routes/bookmarks.js';
import userRoutes from './routes/users.js';
import cors from 'cors';

const app = express();

//middleware
app.use(cors());
app.use(express.json());
dotenv.config();

//routes
app.use('/api', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
    connect();
});