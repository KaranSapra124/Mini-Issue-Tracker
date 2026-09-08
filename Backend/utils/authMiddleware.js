import { jwtVerify } from "./jwtFn.js"

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    // copilot complete this code to verify the token using jwtVerify function from jwtFn.js and attach the decoded payload to req.user
    try {
        const decoded = jwtVerify(token)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
}