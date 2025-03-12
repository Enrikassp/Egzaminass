import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";

const TicketModel = sequelize.define("Tickets", {
    question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    answers: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'pending', 'completed']
    },
    likeCount: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    }
});

TicketModel.belongsTo(UserModel)
UserModel.hasMany(TicketModel)

export default TicketModel;