import dotenv from 'dotenv';
import express from "express";
import { MONGO_URL, PORT } from "./config.js";
import userRouter from './routes/userRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/user",userRouter);



(async ()=>{
    await mongoose.connect(MONGO_URL)
    .then(()=>console.log("DB connected successdully"))
    .catch(()=>console.log("Error while connecting to the DB"));
    app.listen(PORT,()=>console.log(`Server is running on port number ${PORT}`));
})();