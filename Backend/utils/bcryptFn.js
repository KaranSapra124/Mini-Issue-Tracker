import {compare, hashSync} from "bcrypt"

// Hash Password
export const hashPassword =(password)=>{
    return hashSync(password,5)
}

// Comapre password
export const comparePassword = async (password, hashedPassword) => {
    return compare(password, hashedPassword)
}