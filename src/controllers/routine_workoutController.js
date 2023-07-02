const express = require('express');
const app = express();
const {Routine_Workout, sequelize} = require('../models/routine_workoutModel');
var bodyParser = require('body-parser')

class RoutineWorkoutController{

    async createRoutineWorkout( id, routine_id, workout_id) {
        try {
            const newRoutine_Workout = await Routine_Workout.create({ // criando o Routine_Workout
              id: id,
              routine_id: routine_id,
              workout_id: workout_id
            });
        
            const response = {
              newRoutine_Workout: newRoutine_Workout,
              message: 'Inserção do Routine_Workout foi efetuada corretamente.',
            }; 
        
            return response;
          } catch (error) {
            
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response; 
          }
    }

    async getRoutineWorkoutBy(whereClause) {
        try{
            const records = (await Routine_Workout.findAll({
              where: whereClause,
            })).map(record => record.toJSON());
      
            if (records.length === 0) {
              return {message: "Nenhum registro encontrado."}
            }else{
              return records; // Imprima os registros como JSON
            }
        }catch(error){
        // já já mudar o erro para JSON
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response; // Envie a resposta JSON no caso de erro
            //console.error('Erro ao pesquisar registros:', error);
        }
    }

    async deleteRoutineWorkoutBy(id) {
        try {
            const numDeleted = await Routine_Workout.destroy({
               where: {
                 id: id
               }
             });
             console.log(numDeleted);
             if (numDeleted >= 1){
               return {message: "Routine_Workout excluído com sucesso."};
             }
             else{
               return {message: "Nenhum Routine_Workout encontrado com o ID fornecido."};
             }
           } catch{
             const response = {
               sql: error.parent.sql,
               parameters: error.parent.parameters,
               message: error.original.message,
             };
             return response; // Envie a resposta JSON no caso de erro
           }
    }

    async updateRoutineWorkout(id, updateClause) {
        try {
            const routine_workout = await Routine_Workout.findByPk(id);
            if (routine_workout) {
              const updateRoutine_Workout = await routine_workout.update(updateClause);
              const response = {
                updateRoutine_Workout: updateRoutine_Workout,
                message: 'Routine_Workout atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'routine_workout não encontrado.'};
            }
          } catch (error) {
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response
          }
    }
}

module.exports = RoutineWorkoutController;