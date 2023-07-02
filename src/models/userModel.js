const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

//const { Routine } = require('./routineModel');

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sex: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    obj: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    xp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    /*routine_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },*/
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'USER',
    timestamps: false,
    logging:false
  }
);

// User.belongsTo(Routine, { foreignKey: 'routine_id', as: "User_Routine"});
//User.removeAssociation(Routine, 'User_Routine');

module.exports = {User, sequelize};
