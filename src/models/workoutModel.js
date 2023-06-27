const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

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

module.exports = {Workout, sequelize};