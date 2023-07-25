import mongoose from "mongoose";
import cartCollection from "../models/cart.model.js"

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    age:Number,
    password:String,
    role:{
        type:String,
        require:true,
        enum:["user", "admin", "premium"],
        default:"user"
    },
    cart:{
        type:[
            {
                cart:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: cartCollection,
                },
            },
        ],
        default:[],
    },
    documents: {
        type: [
            {
                name: { type: String, required: true },
                reference: { type: String, required: true },
                status: {
                    type: String,
                    required: true,
                    enums: ["completo", "incompleto", "pendiente"],
                    default:"pendiente"
                },
            }
        ],
        default:[]
    },
    last_connection:{
        type: Date,
        default:null
    },
    
    avatar:{type:String, default:""}
})

const userModel = mongoose.model("users", userSchema);
export default userModel;