const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

const {Workout} = require('./workoutModel');
const {Historic} = require('./historicModel');


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

Workout_Realized.belongsTo(Workout, { foreignKey: 'workout_id', as: "workout_realized_workout"});
Workout_Realized.belongsTo(Historic, { foreignKey: 'historic_id', as: "workout_realized_historic"});


module.exports = {Workout_Realized, sequelize};
