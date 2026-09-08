import Router from 'express'
import { createTicket, getTickets, updateTicket , deleteTicket} from '../controller/ticketController.js'
import { authMiddleware } from '../utils/authMiddleware.js'
const ticketRouter = Router()
ticketRouter.post('/create',authMiddleware, createTicket)
ticketRouter.get('/get', authMiddleware, getTickets)
ticketRouter.put('/edit/:id', authMiddleware, updateTicket)
ticketRouter.delete('/delete/:id', authMiddleware, deleteTicket)
export default ticketRouter