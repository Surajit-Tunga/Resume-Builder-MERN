import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';



const app = express();
const PORT = 4000;

app.use(cors());

// Connect DB
connectDB();

// MIDDLEWARE
app.use(express.json());

//Routes

app.get('/', (req,res)=>{
    res.send("API Working");
});

app.listen(PORT, ()=>{
    console.log(`Server Started on http://localhost:${PORT}`);
});


