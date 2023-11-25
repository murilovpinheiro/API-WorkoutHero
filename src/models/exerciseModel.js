const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

const {Muscular_Group_Exercise} = require('./muscular_group_exerciseModel');
const {Muscular_Group} = require('./muscular_groupModel');

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
        muscles: {
            type: DataTypes.STRING,
            allowNull:true
        },
        body_part: {
            type: DataTypes.STRING,
            allowNull:true
        }
    },
        {
            sequelize,
            modelName: "Exercise",
            tableName: "EXERCISE",
            timestamps: false,
            logging:false
        }
);

Exercise.belongsToMany(Muscular_Group, {
    through: Muscular_Group_Exercise,
    foreignKey: 'exercise_id',
    otherKey: 'muscular_group_id',
    as: 'muscularGroups',
});

module.exports = {Exercise, sequelize};