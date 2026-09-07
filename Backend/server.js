import ticketRoutes from './routes/ticketRoutes.js'
import express from 'express'
import cors from 'cors'
import { dbFn } from './utils/dbFn.js'
const app = express()
dbFn()
app.use(cors())
app.use(express.json())

app.use('/api/ticket', ticketRoutes)
const PORT = 3000
app.listen(PORT, () => console.log("Server is running on port " + PORT))
