const express = require('express');
const app = express();
const {Workout, sequelize} = require('../models/workoutModel');
var bodyParser = require('body-parser')

class WorkoutController{

    async createWorkout( id, difficulty, obj, user_id) {
        try {
            const newWorkout = await Workout.create({ // criando o workout
              id: id,
              difficulty: difficulty,
              obj: obj,
              user_id: user_id
            });
        
            const response = {
              newWorkout: newWorkout,
              message: 'Inserção do workout foi efetuada corretamente.',
            }; 
        
            return response;
          } catch (error) {
            //Caso dê erro a gente pega o erro e mostra, para ajudar tratamento e debug futuros :)
            //console.log(error)
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response;
          }
    }

    async getWorkoutBy(whereClause) {
        try{
            const records = (await Workout.findAll({
              where: whereClause,
            })).map(record => record.toJSON());
      
            if (records.length === 0) {
              return {message: "Nenhum registro encontrado."}
            }else{
              return records; 
            }
        }catch(error){
        // já já mudar o erro para JSON
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response; 
            //console.error('Erro ao pesquisar registros:', error);
        }
    }

    async deleteWorkoutBy(id) {
        try {
            const numDeleted = await Workout.destroy({
               where: {
                 id: id
               }
             });
             console.log(numDeleted);
             if (numDeleted >= 1){
               return {message: "workout excluído com sucesso."};
             }
             else{
               return {message: "Nenhum workout encontrado com o ID fornecido."};
             }
           } catch{
             const response = {
               sql: error.parent.sql,
               parameters: error.parent.parameters,
               message: error.original.message,
             };
             return response; 
           }
    }

    async updateWorkout(id, updateClause) {
        try {
            const workout = await Workout.findByPk(id);
            if (workout) {
              const updateWorkout = await workout.update(updateClause);
              const response = {
                updateWorkout: updateWorkout,
                message: 'workout atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'workout não encontrado.'};
            }
          } catch (error) {
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response;
          }
    }
}

module.exports = WorkoutController;