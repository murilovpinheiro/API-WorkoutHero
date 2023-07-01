const express = require('express');
const app = express();
const {Muscular_Group, sequelize} = require('../models/muscular_groupModel');
var bodyParser = require('body-parser')

class MuscularGroupController{

    async createMuscularGroup( id, name) {
        try {
            const newMuscular_Group = await Muscular_Group.create({ 
              id: id,
              name: name
            });
        
            const response = {
              newMuscular_Group: newMuscular_Group,
              message: 'Inserção do Grupo Muscular foi efetuada corretamente.',
            }; // retornando o JSON para ver o resultado
        
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
            const records = (await Muscular_Group.findAll({
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
            const numDeleted = await Muscular_Group.destroy({
               where: {
                 id: id
               }
             });
             console.log(numDeleted);
             if (numDeleted >= 1){
               return {message: "Grupo Muscular excluído com sucesso."};
             }
             else{
               return {message: "Nenhum usuário encontrado com o ID fornecido."};
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
            const muscular_group = await Muscular_Group.findByPk(id);
            if (muscular_group) {
              const updateMuscular_Group = await muscular_group.update(updateClause);
              const response = {
                updateMuscular_Group: updateMuscular_Group,
                message: 'Grupo Muscular atualizado com sucesso.',
              };
              return response;
            } else {
              return {message: 'Grupo Muscular não encontrado.'};
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

module.exports = MuscularGroupController;