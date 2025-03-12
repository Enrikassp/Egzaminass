import TicketModel from "../models/TicketModel.js";

export async function getAllTickets(req, res) {
    if (!req.session || !req.session.isLogged) {
        return res
        .status(403)
        .json({ message: "You must log in first!", status: false });;
    }

    if (!req.session.isAdmin) {
        return res
        .status(403)
        .json({ message: "You are not admin!", status: false });;
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

export async function editTicket(req,res)  {
    try {
        if (!req.session || !req.session.isLogged) {
            return res
            .status(403)
            .json({ message: "You must log in first!", status: false });;
        }

        if (!req.session.isAdmin) {
            return res
            .status(403)
            .json({ message: "You are not admin!", status: false });;
        }

        const {id} = req.params
        if (!id || isNaN(id))
            return res
              .status(400)
              .json({ message: "Ticket has no id" });
        console.log(req)
        const updatedTicket = TicketModel.update(req.body, {where: {id}})

        if (!updatedTicket)
            return res
              .status(404)
              .json({ message: "Ticket with provided ID was not found" });
          res.status(201).json(updatedTicket);
    } catch (err) {
        console.log(err);
    }
}

export async function deleteTicket(req,res) {
    try {
        if (!req.session || !req.session.isLogged) {
            return res
            .status(403)
            .json({ message: "You must log in first!", status: false });;
        }

        if (!req.session.isAdmin) {
            return res
            .status(403)
            .json({ message: "You are not admin!", status: false });;
        }

        const {id} = req.params
        if (!id || isNaN(id))
            return res
              .status(400)
              .json({ message: "Ticket has no id" });

        const updatedTicket = TicketModel.destroy({where: {id}})

        if (!updatedTicket)
            return res
              .status(404)
              .json({ message: "Ticket with provided ID was not found" });
          res.status(201).json(updatedTicket);
    } catch (err) {
        console.log(err);
    }
}