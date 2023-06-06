const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

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

module.exports = {Routine, sequelize};