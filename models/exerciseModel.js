const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

class Exercise extends Model {}
Exercise.init(
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
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sets: {
            type: DataTypes.INTEGER,
        },
        reps: {
            type: DataTypes.INTEGER,
        },
        weight: {
            type: DataTypes.FLOAT,
        },
        obj: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reps_progress: {
            type: DataTypes.INTEGER,
        },
        weight_progress: {
            type: DataTypes.INTEGER,
        },
        rest: {
            type: DataTypes.TIME,
            allowNull:false
        },
    },
        {
            sequelize,
            modelName: "Exercise",
            tableName: "EXERCISE",
            timestamps: false,
            logging:false
        }
);

module.exports = {Exercise, sequelize};