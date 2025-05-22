import dotenv from 'dotenv';
import express from "express";


dotenv.config();
const app = express();



app.listen(8080,()=>console.log(`Server is running on port number ${process.env.PORT}`));