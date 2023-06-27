const express = require('express');
const app = express();
const {Workout_Realized, sequelize} = require('../models/workout_realizedModel');
var bodyParser = require('body-parser')

class WorkoutRealizedController{

    async createWorkoutRealized( id, date_, duration, workout_id, historic_id) {
        try {
            const newWorkout_Realized = await Workout_Realized.create({ // criando o workout_realized
              id: id,
              date_ : date_,
              duration: duration,
              workout_id: workout_id,
              historic_id: historic_id
            });
        
            const response = {
              newWorkout_Realized: newWorkout_Realized,
              message: 'Inserção do workout_realized foi efetuada corretamente.',
            }; // retornando o JSON para ver o resultado
        
            return response; // Envie a resposta JSON no caso de sucesso
          } catch (error) {
            //Caso dê erro a gente pega o erro e mostra, para ajudar tratamento e debug futuros :)
            //console.log(error)
            const response = {
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response; // Envie a resposta JSON no caso de erro
          }
    }

    async getWorkoutRealizedBy(whereClause) {
        try{
            const records = (await Workout_Realized.findAll({
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

    async deleteWorkoutRealizedBy(id) {
        try {
            const numDeleted = await Workout_Realized.destroy({
               where: {
                 id: id
               }
             });
             console.log(numDeleted);
             if (numDeleted >= 1){
               return {message: "workout_realized excluído com sucesso."};
             }
             else{
               return {message: "Nenhum workout_realized encontrado com o ID fornecido."};
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

    async updateWorkoutRealized(id, updateClause) {
        try {
            const workout_realized = await Workout_Realized.findByPk(id);
            if (workout_realized) {
              const updateWorkout_Realized = await workout_realized.update(updateClause);
              const response = {
                updateWorkout_Realized: updateWorkout_Realized,
                message: 'workout_realized atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'workout_realized não encontrado.'};
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

module.exports = WorkoutRealizedController;