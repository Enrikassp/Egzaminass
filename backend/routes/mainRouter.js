import express from 'express'
import authRouter from "./authRouter.js";
import ticketRouter from './ticketRouter.js'
const router = express.Router()
router.use("/auth", authRouter);
router.use('/ticket', ticketRouter)
export default router