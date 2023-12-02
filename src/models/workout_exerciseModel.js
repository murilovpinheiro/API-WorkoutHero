const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

class Workout_Exercise extends Model {}
Workout_Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,              
        },
        workout_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        exercise_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sets: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reps: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            sequelize,
            modelName: "Workout_Exercise",
            tableName: "WORKOUT_EXERCISE",
            timestamps: false,
            logging:false
        }
);

module.exports = {Workout_Exercise, sequelize};