import TicketModel from "../models/TicketModel.js";

export async function getAllTickets(req, res) {
    if (!req.session || !req.session.isLogged) {
        return res
        .status(403)
        .json({ message: "You must log in first!", status: false });;
    }

    const Tickets = await TicketModel.findAll()
    console.log(Tickets)
    res.status(200).json(Tickets)
}

export async function getAllCompletedTickets(req, res) {
    if (!req.session || !req.session.isLogged) {
        return res
        .status(403)
        .json({ message: "You must log in first!", status: false });;
    }

    const Tickets = await TicketModel.findAll({where: {status: 'completed'}})
    res.status(200).json(Tickets)
}



export async function createTicket(req,res) {
    try {
        if (!req.session || !req.session.isLogged) {
            return res
            .status(403)
            .json({ message: "You must log in first!", status: false });;
        }
        const ticketData = {...req.body, answers: req.body.answers.join("; \n"), UserId: req.session.user.id}
        const newTicket = await TicketModel.create(ticketData)
        res.status(201).json({ newTicket, status: true });
    } catch(err) 
    {
        console.log(err);
    }
}

export async function getAllUserTickets(req,res) {
    try {
        if (!req.session || !req.session.isLogged) {
            return res
            .status(403)
            .json({ message: "You must log in first!", status: false });;
        }
        const userTickets = await TicketModel.findAll({
            where: {UserId: req.session.user.id}, 
            order: [["createdAt", "DESC"]]
        })
        res.status(200).json(userTickets)
    } catch(err) 
    {
        console.log(err);
    } 
}