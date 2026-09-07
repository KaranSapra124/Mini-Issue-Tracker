import Router from 'express'
import { createTicket, getTickets, updateTicket } from '../controller/ticketController.js'
const ticketRouter = Router()
ticketRouter.post('/create', createTicket)
ticketRouter.get('/get', getTickets)
ticketRouter.put('/edit/:id', updateTicket)
export default ticketRouter