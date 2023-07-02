const express = require('express');
const app = express();
const {Workout_Realized, sequelize} = require('../models/workout_realizedModel');
var bodyParser = require('body-parser');
const { Workout } = require('../models/workoutModel');
const { Historic } = require('../models/historicModel');
const { Workout_Exercise } = require('../models/workout_exerciseModel');
const { Exercise } = require('../models/exerciseModel');

class WorkoutRealizedController{

    async createWorkoutRealized( id, date_, duration, workout_id, historic_id) {
      console.log( id, date_, duration, workout_id, historic_id)
        try {
            const newWorkout_Realized = await Workout_Realized.create({ // criando o workout_realized
              id: id,
              date_ : date_,
              duration: duration,
              workout_id: workout_id,
              historic_id: historic_id
            });

            const historic = await Historic.findOne({ where: { id: historic_id } });
            if (historic) {
              const workout = await Workout.findOne({where: { id: workout_id }});
              console.log(workout)

              const workout_exercise = await Workout_Exercise.findAll({where: { workout_id: workout.id }});
              //console.log(workout_exercise)
              
              let exercise_ids = []; // Lista para armazenar os exercise_ids

              workout_exercise.forEach((item) => {
                exercise_ids.push(item.exercise_id); // Adicionar o exercise_id à lista
              });
              console.log(exercise_ids)
              
              const exerciseList = await Exercise.findAll({ where: { id: exercise_ids } });
              console.log(exerciseList)
              
              const sum_reps = exerciseList.reduce((accumulator, exercise) => accumulator + (exercise.reps * exercise.sets), 0);
              //const sum_wgt = exerciseList.reduce((accumulator, exercise) => accumulator + (exercise.weights_lifted), 0);
             
              console.log(historic.weights_lifted)
              console.log(historic.reps_done)
              console.log(historic.days_trained)

              historic.weights_lifted += 30
              historic.reps_done += sum_reps
              historic.days_trained += 1
              historic.time_training += 1 // considerando todos os exercícios de 1 hora de duração
              await historic.save();
            }
        
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
      try {
        const records = await Workout_Realized.findAll({
          where: whereClause,
          include: {
            model: Workout,
            as: 'workout_realized_workout'
          },
          include: {
            model: Historic,
            as: 'workout_realized_historic'
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