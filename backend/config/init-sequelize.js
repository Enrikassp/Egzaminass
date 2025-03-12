import UserModel from "../models/UserModel.js";
import sequelize from "./sequelize.js";

await sequelize.sync();