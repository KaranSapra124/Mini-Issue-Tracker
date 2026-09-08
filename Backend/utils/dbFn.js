import mongoose from "mongoose"



export const dbFn = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected"))
        .catch((err) => console.log(err))
}