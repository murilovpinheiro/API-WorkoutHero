const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

const {Workout} = require('./workoutModel');
const {Routine_Workouts} = require("./routine_workoutModel")

class Routine extends Model {}
Routine.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,              
        },
        user_creator_id: {
            type: DataTypes.INTEGER,
        },
    },
        {
            sequelize,
            modelName: "Routine",
            tableName: "ROUTINE",
            timestamps: false,
            logging:false
        }
);

Routine.belongsToMany(Workout, {
    through: Routine_Workouts,
    foreignKey: 'routine_id',
    otherKey: 'workout_id',
    as: 'workoutList',
});

module.exports = {Routine, sequelize};