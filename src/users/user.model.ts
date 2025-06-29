import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document{

    fullname: string;
    email:string;
    password: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val:string): Promise<boolean>; 
}

const userSchema = new mongoose.Schema<UserDocument>({
    fullname: {type:String, required:true},
    email: {type:String, unique:true, required:true},
    password: {type:String, required:true},
    verified: {type:Boolean,required:true, default:false},
    },
    {
        timestamps:true
    }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await hashValue(this.password);
    next();
});

userSchema.methods.comparePassword = async function(val: string){
    return compareValue(val,this.password);
}

const UserModel = mongoose.model<UserDocument>("User",userSchema);
export default UserModel;