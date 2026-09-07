import Ticket from "../models/Ticket.js"

// import Ticket from "../models/Ticket"
export const createTicket = async (req, res) => {
    try {
        const newTicker = await Ticket.create(req.body)
        return res.status(200).json({ message: "Ticket created successfully", ticket: newTicker })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
        return res.status(200).json({ message: "Tickets fetched successfully", tickets })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const updateTicket = async (req, res) => {
    try {
        const { id } = req.params
        const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" })
        }
        return res.status(200).json({ message: "Ticket updated successfully", ticket: updatedTicket })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params
        const deletedTicket = await Ticket.findByIdAndDelete(id)
        if (!deletedTicket) {
            return res.status(404).json({ message: "Ticket not found" })
        }
        return res.status(200).json({ message: "Ticket deleted successfully", ticket: deletedTicket })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}
