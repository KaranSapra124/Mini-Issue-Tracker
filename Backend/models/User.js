import { Schema, model } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Manager'],
        default: "Manager"
    }
}, { timestamps: true })

export default model("User", userSchema)