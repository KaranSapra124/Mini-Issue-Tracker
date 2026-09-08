import User from "../models/User.js"
import { comparePassword, hashPassword } from "../utils/bcryptFn.js"
import { jwtSign } from "../utils/jwtFn.js"

export const userSignIn = async (req, res) => {
    try {
        const { name, password, email } = req.body
        if (!name) return res.status(403).send({ message: "Name is required" })
        else if (!password) return res.status(403).send({ message: "Password is required" })
        else if (!email) return res.status(403).send({ message: "Email is required" })

        const isExist = await User.findOne({ email: email })
        if (isExist) return res.status(402).send({ message: "User already exists!" })

        const hashPass = hashPassword(password)

        const newUser = await User.create({ ...req.body, password: hashPass })

        return res.status(200).send({ message: "User Created Successfully!" })
    } catch (err) {
        return res.status(402).send({ message: "Error:", err })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) return res.status(403).send({ message: "Email is required" })
        else if (!password) return res.status(403).send({ message: "Password is required" })
        const userData = await User.findOne({ email: email })
        if (!userData) return res.status(402).send({ message: "User not found!" })
        // Hash and check password
        const isMatch = await comparePassword(password, userData.password)
        if (!isMatch) return res.status(402).send({ message: "Password is incorrect!" })
        // Generate JWT token
        const token = jwtSign({ role: userData.role, id: userData._id })
        return res.status(200).send({ message: "Login successful!", token, role:userData.role })
    } catch (err) {
        return res.status(402).send({ message: "Error:", err })
    }
}