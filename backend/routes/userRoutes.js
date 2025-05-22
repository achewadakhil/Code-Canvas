import express from "express";
import { isValidInput } from "../middlewares/validInput.js";
import userModel from "../models/userdb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config.js";

const userRouter = express.Router();

userRouter.post("/signup", isValidInput,async (req, res) => {
    const {email,password} = req.body;
    try{
        await userModel.create({
            email,
            password : await bcrypt.hash(password,5)
        });
        res.status(200).json({
            message : "User added successfully"
        });
    }catch(err){
        res.status(401).json({
            err
        });
    }
});

userRouter.post("/signin",isValidInput,async (req,res)=>{
    const {email, password} = req.body;
    try{
        const foundUser = await userModel.findOne({email}); 
        if(!foundUser){
            return res.json({
                message : "Email doesn't exist"
            });
        }  
        const hashPass = await bcrypt.compare(password,foundUser.password);
        if(hashPass){
            const token = jwt.sign({id : foundUser._id},JWT_USER_SECRET);
            res.setHeader("token",token);
            res.status(200).json({
                message : "Signed in successfully",
                token
            });
        }else{
            res.status(401).json({
                message : "Password didn't match"
            });
        }
    }catch(err){
        res.status(501).json({
            message : "Couldn't signin successfully" 
        });
    }
})

export default userRouter;
