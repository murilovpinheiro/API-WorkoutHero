const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

class Workout_Realized extends Model {}
Workout_Realized.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    date_: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    duration: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    workout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    historic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Workout_Realized',
    tableName: 'WORKOUT_REALIZED',
    timestamps: false,
    logging:false
  }
);

module.exports = {Workout_Realized, sequelize};
