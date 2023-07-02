const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

const {Exercise} = require('./exerciseModel');
const {Workout_Exercise} = require('./workout_exerciseModel');

class Workout extends Model {}
Workout.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,              
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        obj: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
        {
            sequelize,
            modelName: "Workout",
            tableName: "WORKOUT",
            timestamps: false,
            logging:false
        }
);

Workout.belongsToMany(Exercise, {
    through: Workout_Exercise,
    foreignKey: 'workout_id',
    otherKey: 'exercise_id',
    as: 'exerciseList',
});

module.exports = {Workout, sequelize};