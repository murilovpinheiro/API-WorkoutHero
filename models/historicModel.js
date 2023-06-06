const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

class Historic extends Model {}
Historic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    days_trained: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weights_lifted: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reps_done: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time_training: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Historic',
    tableName: 'HISTORIC',
    timestamps: false,
    logging:false
  }
);

module.exports = {Historic, sequelize};
