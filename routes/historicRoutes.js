const express = require('express');
const app = express();
const {Historic, sequelize} = require('../models/historicModel');
const router = express.Router();
var bodyParser = require('body-parser')
const { buildHistoric } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildHistoric, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  try{
      const records = (await Historic.findAll({
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
   const numDeleted = await Historic.destroy({
      where: {
        id: id
      }
    });
    console.log(numDeleted);
    if (numDeleted >= 1){
      res.json({message: "histórico excluído com sucesso."});
    }
    else{
      res.json({message: "Nenhum histórico encontrado com o ID fornecido."});
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

router.post('/insert', urlencodedParser, async (req, res) => {
  const { id, user_id, days_trained, weights_lifted, reps_done, time_training} = req.body;
  //console.log(req.body);
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

router.post('/update', urlencodedParser, buildHistoric, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  try {
    const historic = await Historic.findByPk(id);
    if (historic) {
      const updateHistoric = await historic.update(updateClause);
      const response = {
        updateHistoric: updateHistoric,
        message: 'Historico atualizado com sucesso.',
      };
      res.json(response);
    } else {
      res.json({message: 'Historico não encontrado.'});
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
