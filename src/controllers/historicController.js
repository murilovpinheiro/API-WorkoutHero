const express = require('express');
const app = express();
const {Historic, sequelize} = require('../models/historicModel');
var bodyParser = require('body-parser')



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
              newHistoric: newHistoric,
              message: 'Inserção do histórico foi efetuada corretamente.',
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

    async getHistoricBy(whereClause) {
        try{
            const records = (await Historic.findAll({
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