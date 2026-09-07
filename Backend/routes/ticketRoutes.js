import Router from 'express'
import { createTicket, getTickets, updateTicket , deleteTicket} from '../controller/ticketController.js'
const ticketRouter = Router()
ticketRouter.post('/create', createTicket)
ticketRouter.get('/get', getTickets)
ticketRouter.put('/edit/:id', updateTicket)
ticketRouter.delete('/delete/:id', deleteTicket)
export default ticketRouter