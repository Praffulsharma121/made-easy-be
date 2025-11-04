const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Teacher = sequelize.define("Teacher", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
  },
  subjects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
  },
  highest_qualification: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Teacher;
