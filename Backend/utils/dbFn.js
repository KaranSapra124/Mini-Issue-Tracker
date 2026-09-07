import mongoose from "mongoose"

export const dbFn = async () => {
    await mongoose.connect('mongodb+srv://taskDb:Iamphenomenol1!@cluster0.g46kmug.mongodb.net/?appName=Cluster0')
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err))
}