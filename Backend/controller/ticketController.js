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
    }catch(err){
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }

}