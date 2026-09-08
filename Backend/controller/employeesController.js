import Employee from "../models/Employee.js"
import Ticket from "../models/Ticket.js"
import { hashPassword } from "../utils/bcryptFn.js"

export const createEmployee = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name) return res.status(400).json({ message: "Name is required" })
        if (!email) return res.status(400).json({ message: "Email is required" })
        if (!password) return res.status(400).json({ message: "Password is required" })
        const isExist = await Employee.findOne({ email })
        if (isExist) return res.status(409).json({ message: "Employee already exists" })
        const hashedPass = hashPassword(password)
        const newEmployee = await Employee.create({ ...req.body, password: hashedPass, createdBy: req.user.id })
        return res.status(201).json({ message: "Employee created successfully", employee: newEmployee })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ createdBy: req.user.id }).populate("ticketsAssigned").select("-password")
        return res.status(200).json({ message: "Employees fetched successfully", employees })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params
        const employee = await Employee.findOne({ _id: id, createdBy: req.user.id }).populate("ticketsAssigned").select("-password")
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" })
        }
        return res.status(200).json({ message: "Employee fetched successfully", employee })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const data = { ...req.body }
        if (data.password) {
            data.password = hashPassword(data.password)
        }
        delete data.ticketsAssigned
        delete data.createdBy
        const updatedEmployee = await Employee.findOneAndUpdate({ _id: id, createdBy: req.user.id }, data, { new: true }).select("-password")
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" })
        }
        return res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const deletedEmployee = await Employee.findOneAndDelete({ _id: id, createdBy: req.user.id })
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" })
        }
        return res.status(200).json({ message: "Employee deleted successfully", employee: deletedEmployee })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const assignTicket = async (req, res) => {
    try {
        const employeeId = req.params.id || req.body.employeeId
        const { ticketId } = req.body
        if (!employeeId) return res.status(400).json({ message: "Employee id is required" })
        if (!ticketId) return res.status(400).json({ message: "Ticket id is required" })
        const ticket = await Ticket.findById(ticketId)
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" })
        }
        const employee = await Employee.findOneAndUpdate(
            { _id: employeeId, createdBy: req.user.id },
            { $addToSet: { ticketsAssigned: ticketId } },
            { new: true }
        ).populate("ticketsAssigned").select("-password")
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" })
        }
        return res.status(200).json({ message: "Ticket assigned successfully", employee })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}
