const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

class Routine_Workout extends Model {}
Routine_Workout.init(
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
            modelName: "Routine_Workout",
            tableName: "ROUTINE_WORKOUT",
            timestamps: false,
            logging:false
        }
);

module.exports = {Routine_Workout, sequelize};