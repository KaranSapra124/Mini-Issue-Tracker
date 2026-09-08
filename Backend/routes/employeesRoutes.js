import Router from 'express'
import { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, assignTicket } from '../controller/employeesController.js'
import { authMiddleware } from '../utils/authMiddleware.js'
const employeesRouter = Router()
employeesRouter.post('/create', authMiddleware, createEmployee)
employeesRouter.get('/get', authMiddleware, getEmployees)
employeesRouter.get('/get/:id', authMiddleware, getEmployeeById)
employeesRouter.put('/edit/:id', authMiddleware, updateEmployee)
employeesRouter.delete('/delete/:id', authMiddleware, deleteEmployee)
employeesRouter.put('/assign/:id', authMiddleware, assignTicket)
export default employeesRouter
