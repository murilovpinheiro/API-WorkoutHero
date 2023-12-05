const express = require('express');
const app = express();
const {Workout_Exercise, sequelize} = require('../models/workout_exerciseModel');
var bodyParser = require('body-parser')

class WorkoutExerciseController{

    async createWorkoutExercise(id, workout_id, exercise_id) {
        try {

            let current_id = 0;
            let last_id = 0

            console.log("Buscando id de workout_exercise disponível.")
            const allWorkoutExercises = (await Workout_Exercise.findAll()).map(allWorkoutExercises => allWorkoutExercises.toJSON());
            
            allWorkoutExercises.forEach(workout_exercise => {
              if (workout_exercise.id > last_id){
                last_id = workout_exercise.id
              }
              if (workout_exercise.id == current_id){
                current_id = last_id + 1;
              }
            });

            console.log("id disponível encontrado: " + current_id)

            const newWorkout_Exercise = await Workout_Exercise.create({ // criando o workout_exercise
              id: current_id, 
              workout_id: workout_id,
              exercise_id: exercise_id,
              sets: 3,
              reps: 10
            });
        
            const response = {
              newWorkout_Exercise: newWorkout_Exercise,
              sucess: true,
              message: 'Inserção do workout_exercise foi efetuada corretamente.',
            }; // retornando o JSON para ver o resultado
        
            return response; // Envie a resposta JSON no caso de sucesso
          } catch (error) {
            //Caso dê erro a gente pega o erro e mostra, para ajudar tratamento e debug futuros :)
            console.log(error)
            const response = {
              sucess: false,
              message: error.message,
            };
            return response; // Envie a resposta JSON no caso de erro
          }
    }

    async getWorkoutExerciseBy(whereClause) {
        try{
            const records = (await Workout_Exercise.findAll({
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

    async deleteWorkoutExerciseBy(id) {
        try {
            const numDeleted = await Workout_Exercise.destroy({
               where: {
                 id: id
               }
             });
             console.log(numDeleted);
             if (numDeleted >= 1){
               return {message: "workout_exercise excluído com sucesso."};
             }
             else{
               return {message: "Nenhum workout_exercise encontrado com o ID fornecido."};
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

    async updateWorkoutExercise(id, updateClause) {
        try {
            const workout_exercise = await Workout_Exercise.findByPk(id);
            if (workout_exercise) {
              const updateWorkout_Exercise = await workout_exercise.update(updateClause);
              const response = {
                updateWorkout_Exercise: updateWorkout_Exercise,
                message: 'workout_exercise atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'workout_exercise não encontrado.'};
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

module.exports = WorkoutExerciseController;