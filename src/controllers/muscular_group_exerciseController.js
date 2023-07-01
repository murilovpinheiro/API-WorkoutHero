const express = require('express');
const app = express();
const {Muscular_Group_Exercise, sequelize} = require('../models/muscular_group_exerciseModel');
var bodyParser = require('body-parser')

class MuscularGroupExerciseController{

    async createMuscularGroupExercise( id, muscular_group_id, exercise_id) {
        // Checagens vai ser no banco
        try {
            const newMuscular_Group_Exercise = await Muscular_Group_Exercise.create({ // criando o usuário
              id: id,
              muscular_group_id: muscular_group_id,
              exercise_id: exercise_id
            });
        
            const response = {
              newMuscular_Group_Exercise: newMuscular_Group_Exercise,
              message: 'Inserção de Muscular_Group_Exercise foi efetuada corretamente.',
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

    async getMuscularGroupExerciseBy(whereClause) {
        try{
            const records = (await Muscular_Group_Exercise.findAll({
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

    async deleteMuscularGroupExerciseBy(id) {
        try {
            const numDeleted = await Muscular_Group_Exercise.destroy({
               where: {
                 id: id
               }
             });
             console.log(numDeleted);
             if (numDeleted >= 1){
               return {message: "Grupo Muscular / Exercício  excluído com sucesso."};
             }
             else{
               return {message: "Nenhum Grupo Muscular / Exercício encontrado com o ID fornecido."};
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

    async updateMuscularGroupExercise(id, updateClause) {
        try {
            const muscular_group_exercise = await Muscular_Group_Exercise.findByPk(id);
            if (muscular_group_exercise) {
              const updateMuscular_Group_Exercise = await muscular_group_exercise.update(updateClause);
              const response = {
                updateMuscular_Group_Exercise: updateMuscular_Group_Exercise,
                message: 'Muscular_Group_Exercise atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'Muscular_Group_Exercise não encontrado.'};
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

module.exports = MuscularGroupExerciseController;