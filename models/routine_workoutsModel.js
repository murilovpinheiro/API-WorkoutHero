const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

class Routine_Workouts extends Model {}
Routine_Workouts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,              
        },
        routine_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        workout_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
        {
            sequelize,
            modelName: "Routine_Workouts",
            tableName: "ROUTINE_WORKOUTS",
            timestamps: false,
            logging:false
        }
);

module.exports = {Routine_Workouts, sequelize};