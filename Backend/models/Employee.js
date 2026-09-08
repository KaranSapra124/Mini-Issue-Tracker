import { Schema, model } from "mongoose"

const employeeSchema = new Schema({
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
        default: "Employee"
    },
    ticketsAssigned: [{
        type: Schema.Types.ObjectId,
        ref: "Ticket"
    }],
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export default model("Employee", employeeSchema)