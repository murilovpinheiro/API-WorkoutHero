const express = require('express');
const app = express();
const {Routine, sequelize} = require('../models/routineModel');
var bodyParser = require('body-parser')

const {Workout} = require('../models/workoutModel');

class RoutineController{

    async createRoutine( id, user_creator_id) {
        try {
            const newRoutine = await Routine.create({ // criando o usuário
              id: id,
              user_creator_id: user_creator_id,
            });
        
            const response = {
              newRoutine: newRoutine,
              message: 'Inserção de Rotina foi efetuada corretamente.',
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

    async getRoutineBy(whereClause) {
      try{
          const records = (await Routine_Workouts.findAll({
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
    async deleteRoutineBy(id) {
        try {
            const numDeleted = await Routine.destroy({
               where: {
                 id: id
               }
             });
             console.log(numDeleted);
             if (numDeleted >= 1){
               return {message: "Rotina excluído com sucesso."};
             }
             else{
               return {message: "Nenhuma Rotina encontrada com o ID fornecido."};
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

    async updateRoutine(id, updateClause) {
        try {
            const routine = await Routine.findByPk(id);
            if (routine) {
              const updateRoutine = await routine.update(updateClause);
              const response = {
                updateRoutine: updateRoutine,
                message: 'Rotina atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'Rotina não encontrado.'};
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

module.exports = RoutineController;