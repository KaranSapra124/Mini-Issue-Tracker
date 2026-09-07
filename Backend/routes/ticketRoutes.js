import Router from 'express'
import { createTicket, getTickets } from '../controller/ticketController.js'
const ticketRouter = Router()
ticketRouter.post('/create', createTicket)
ticketRouter.get('/get', getTickets)
export default ticketRouter