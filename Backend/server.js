import ticketRoutes from './routes/ticketRoutes.js'
import employeesRouter from './routes/employeesRoutes.js'
import express from 'express'
import cors from 'cors'
import { dbFn } from './utils/dbFn.js'
import dotenv from "dotenv"
import authRouter from './routes/authRoutes.js'

dotenv.config()
const app = express()
dbFn()
app.use(cors())
app.use(express.json())

app.use('/api/ticket', ticketRoutes)
app.use('/api/auth', authRouter)
app.use('/api/employees', employeesRouter)
const PORT = 3000
app.listen(PORT, () => console.log("Server is running on port " + PORT))
