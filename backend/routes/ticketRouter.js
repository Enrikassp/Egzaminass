import express from "express";
import * as ticketController from '../controllers/ticket-controler.js'
const router = express.Router();
// http://localhost/server/api/tickets/
router.get("/", ticketController.getAllTickets);
router.get("/owned", ticketController.getAllUserTickets);
router.get("/completed", ticketController.getAllCompletedTickets);
router.post("/", ticketController.createTicket);
export default router;