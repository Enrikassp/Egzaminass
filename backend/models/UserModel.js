import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

const UserModel = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
});

export default UserModel;