const express = require('express');
const app = express();
const {Exercise, sequelize} = require('../models/exerciseModel');
var bodyParser = require('body-parser')

const {Muscular_Group} = require('../models/muscular_groupModel');

class ExerciseController{

    async createExercise(id, name, difficulty, sets, reps, weight, obj, reps_progress, weight_progress, rest) {
        // Checagens vai ser no banco

        try {
            const newExercise = await Exercise.create({ 
              id: id,
              name: name,
              difficulty: difficulty,
              sets: sets,
              reps: reps,
              weight: weight,
              obj: obj,
              reps_progress: reps_progress,
              weight_progress: weight_progress,
              rest: rest
            });
        
            const response = {
              newExercise: newExercise,
              message: 'Inserção de Exercício foi efetuada corretamente.',
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

    async getExerciseBy(whereClause) {
      try {
        const records = await Exercise.findAll({
          where: whereClause,
          include: {
            model: Muscular_Group,
            as: 'muscularGroups',
          },
        });
    
        if (records.length === 0) {
          return { message: "Nenhum registro encontrado." };
        } else {
          return records.map(record => record.toJSON());
        }
      } catch (error) {
        const response = {
          message: error.message,
        };
        if (error.parent && error.parent.sql) {
          response.sql = error.parent.sql;
          response.parameters = error.parent.parameters;
        }
        return response;
      }
    };

    async deleteExerciseBy(id) {
        try {
            const numDeleted = await Exercise.destroy({
               where: {
                 id: id
               }
             });
             console.log(numDeleted);
             if (numDeleted >= 1){
               return{message: "Exercício excluído com sucesso."};
             }
             else{
               return{message: "Nenhum exercício encontrado com o ID fornecido."};
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

    async updateExercise(id, updateClause) {
        try {
            const exercise = await Exercise.findByPk(id);
            if (exercise) {
              const updateExercise = await exercise.update(updateClause);
              const response = {
                updateExercise: updateExercise,
                message: 'Exercicio atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'Exercicio não encontrado.'};
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

module.exports = ExerciseController;