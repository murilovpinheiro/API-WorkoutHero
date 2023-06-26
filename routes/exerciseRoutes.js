const express = require('express');
const app = express();
const {Exercise, sequelize} = require('../models/exerciseModel');
const router = express.Router();
var bodyParser = require('body-parser')
const { buildExercise } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildExercise, async (req, res) => {
    const whereClause = req.cla ;
    //console.log(whereClause)
    try{
        const records = (await Exercise.findAll({
          where: whereClause,
        })).map(record => record.toJSON());
  
        if (records.length === 0) {
          res.json({message: "Nenhum registro encontrado."})
        }else{
          res.json(records); // Imprima os registros como JSON
        }
    }catch(error){
    // já já mudar o erro para JSON
        const response = {
          sql: error.parent.sql,
          parameters: error.parent.parameters,
          message: error.original.message,
        };
        res.json(response); // Envie a resposta JSON no caso de erro
        //console.error('Erro ao pesquisar registros:', error);
    }
  });
  
  router.post('/delete', urlencodedParser, async (req, res) => {
    const {id} = req.body;
    try {
     const numDeleted = await Exercise.destroy({
        where: {
          id: id
        }
      });
      console.log(numDeleted);
      if (numDeleted >= 1){
        res.json({message: "Exercício excluído com sucesso."});
      }
      else{
        res.json({message: "Nenhum exercício encontrado com o ID fornecido."});
      }
    } catch{
      const response = {
        sql: error.parent.sql,
        parameters: error.parent.parameters,
        message: error.original.message,
      };
      res.json(response); // Envie a resposta JSON no caso de erro
    }
  });
  
  router.post('/insert',urlencodedParser, async (req, res) => {
    const { id, name, difficulty, sets, reps, weight, obj, reps_progress, weight_progress, rest} = req.body;
    //console.log(req.body);
    try {
      const newExercise = await Exercise.create({ // criando o usuário
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
      }; // retornando o JSON para ver o resultado
  
      res.json(response); // Envie a resposta JSON no caso de sucesso
    } catch (error) {
      //Caso dê erro a gente pega o erro e mostra, para ajudar tratamento e debug futuros :)
      //console.log(error)
      const response = {
        sql: error.parent.sql,
        parameters: error.parent.parameters,
        message: error.original.message,
      };
      res.json(response); // Envie a resposta JSON no caso de erro
    }
  });
  
  router.post('/update', urlencodedParser, buildExercise, async (req, res) => {
    const {id, ...updateClause} = req.clause;
    try {
      const exercise = await Exercise.findByPk(id);
      if (exercise) {
        const updateExercise = await exercise.update(updateClause);
        const response = {
          updateExercise: updateExercise,
          message: 'Exercicio atualizado com sucesso.',
        };
        res.json(response);
      } else {
        res.json({message: 'Exercicio não encontrado.'});
      }
    } catch (error) {
      const response = {
        sql: error.parent.sql,
        parameters: error.parent.parameters,
        message: error.original.message,
      };
    }
  });
  
  module.exports = router
  