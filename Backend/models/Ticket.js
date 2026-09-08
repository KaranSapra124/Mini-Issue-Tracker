import { Schema , model} from "mongoose"

const ticketSchema = new Schema({
    title: String,
    description: String,
    priority: {
        type:String,
        enum: ["low", "medium", "high"]
    },
    status: {
        type:String,
        enum: ["open", "in progress", "closed"]
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Date
})

export default model("Ticket", ticketSchema)

