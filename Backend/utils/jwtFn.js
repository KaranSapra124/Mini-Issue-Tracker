import jwt from 'jsonwebtoken'

// Sign in
export const jwtSign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// Verify token
export const jwtVerify = (token) => {
    return jwt.verify(token,process.env.JWT_SECRET)
}