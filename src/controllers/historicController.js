const express = require('express');
const app = express();
const {Historic, sequelize} = require('../models/historicModel');
var bodyParser = require('body-parser');
const { User } = require('../models/userModel');



class HistoricController{

    async createHistoric( id, user_id, days_trained, weights_lifted, reps_done, time_training) {
        // Checagens vai ser no banco
        try {
            const newHistoric = await Historic.create({ // criando o usuário
              id: id,
              user_id: user_id,
              days_trained: days_trained,
              weights_lifted: weights_lifted,
              reps_done: reps_done,
              time_training: time_training
            });
        
            const response = {
              sucess: true,
              newHistoric: newHistoric,
              message: 'Inserção do histórico foi efetuada corretamente.',
            }; // retornando o JSON para ver o resultado
              
            return response; // Envie a resposta JSON no caso de sucesso
          } catch (error) {
            //Caso dê erro a gente pega o erro e mostra, para ajudar tratamento e debug futuros :)
            //console.log(error)
            console.log("createHistoric error: ", error)
            const response = {
              sucess: false,
              sql: error.parent.sql,
              parameters: error.parent.parameters,
              message: error.original.message,
            };
            return response; // Envie a resposta JSON no caso de erro
          }
    }

    async getHistoricBy(whereClause) {
      try {
        const records = await Historic.findAll({
          where: whereClause,
          include: {
            model: User,
            as: 'userInformation',
          },
        });
    
        if (records.length === 0) {
          return { message: "Nenhum registro encontrado." };
        } else {
          return records.map(record => record.toJSON());
        }
      } catch (error) {
        const response = {
          sucess: false,
          message: error.message,
        };
        if (error.parent && error.parent.sql) {
          sucess: false,
          response.sql = error.parent.sql;
          response.parameters = error.parent.parameters;
        }
        return response;
      }
    }
    async deleteHistoricBy(id) {
        try {
            const numDeleted = await Historic.destroy({
               where: {
                 id: id
               }
             });
             console.log(numDeleted);
             if (numDeleted >= 1){
               return {message: "histórico excluído com sucesso."};
             }
             else{
               return {message: "Nenhum histórico encontrado com o ID fornecido."};
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

    async updateHistoric(id, updateClause) {
        try {
            const historic = await Historic.findByPk(id);
            if (historic) {
              const updateHistoric = await historic.update(updateClause);
              const response = {
                updateHistoric: updateHistoric,
                message: 'Historico atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'Historico não encontrado.'};
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

module.exports = HistoricController;