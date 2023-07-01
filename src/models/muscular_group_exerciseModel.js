const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

class Muscular_Group_Exercise extends Model {}
Muscular_Group_Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,              
        },
        muscular_group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        exercise_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        {
            sequelize,
            modelName: "Muscular_Group_Exercise",
            tableName: "MUSCULAR_GROUP_EXERCISE",
            timestamps: false,
            logging:false
        }
);

module.exports = {Muscular_Group_Exercise, sequelize};