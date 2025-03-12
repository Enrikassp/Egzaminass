import "./config/init-sequelize.js";
import express from "express";
import mainRouter from './routes/mainRouter.js'
import { configDbSession } from "./config/setup-sessions.js";
const app = express();

app.use(express.json());
configDbSession(app);
app.use("/api", mainRouter);

app.listen(3001, () => {
	console.log("Development server has started, go to http://localhost/server/");
});