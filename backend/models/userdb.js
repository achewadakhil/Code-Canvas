import mongoose from "mongoose";
import { Schema , ObjectId } from "mongoose";

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

const userModel = mongoose.model("users",userSchema);
export default userModel;