const express = require('express');
const app = express();
const {Workout, sequelize} = require('../models/workoutModel');
var bodyParser = require('body-parser')

const {Exercise} = require('../models/exerciseModel');
const { Muscular_Group } = require('../models/muscular_groupModel');

class WorkoutController{

    async createWorkout(id, difficulty, obj, user_id) {
        console.log('PARAMETROS: ', id, difficulty, obj, user_id);
        try {

          let current_id = 0;
          let last_id = 0

          console.log("Buscando id de workout disponível.")
          const allWorkouts = (await Workout.findAll()).map(allWorkouts => allWorkouts.toJSON());
          
          allWorkouts.forEach(workout => {
            if (workout.id > last_id){
              last_id = workout.id
            }
            if (workout.id == current_id){
              current_id = last_id + 1;
            }
          });

          console.log("id disponível encontrado: " + current_id)

          const newWorkout = await Workout.create({ // criando o workout
            id: current_id,
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
          console.log(error)
          const response = {
            sucess: false,
            message: 'Erro ao criar workout',
            error: error,
          };
          return response;
        }
    }
    async getWorkoutBy(whereClause) {
      try {
        const records = await Workout.findAll({
          where: whereClause,
          include: {
            model: Exercise,
            as: 'exerciseList',
            include: {
            model:Muscular_Group,
            as: "muscularGroups"}
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