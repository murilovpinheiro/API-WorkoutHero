const express = require('express');
const app = express();
const {Muscular_Group_Exercise, sequelize} = require('../models/muscular_group_exerciseModel');
const router = express.Router();
var bodyParser = require('body-parser')
const { buildMuscularGroupExercise } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildMuscularGroupExercise, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  try{
      const records = (await Muscular_Group_Exercise.findAll({
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
   const numDeleted = await Muscular_Group_Exercise.destroy({
      where: {
        id: id
      }
    });
    console.log(numDeleted);
    if (numDeleted >= 1){
      res.json({message: "Grupo Muscular / Exercício  excluído com sucesso."});
    }
    else{
      res.json({message: "Nenhum Grupo Muscular / Exercício encontrado com o ID fornecido."});
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
  const { id, muscular_group_id, exercise_id} = req.body;
  //console.log(req.body);
  try {
    const newMuscular_Group_Exercise = await Muscular_Group_Exercise.create({ // criando o usuário
      id: id,
      muscular_group_id: muscular_group_id,
      exercise_id: exercise_id
    });

    const response = {
      newMuscular_Group_Exercise: newMuscular_Group_Exercise,
      message: 'Inserção de Muscular_Group_Exercise foi efetuada corretamente.',
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

router.post('/update', urlencodedParser, buildMuscularGroupExercise, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  try {
    const muscular_group_exercise = await Muscular_Group_Exercise.findByPk(id);
    if (muscular_group_exercise) {
      const updateMuscular_Group_Exercise = await muscular_group_exercise.update(updateClause);
      const response = {
        updateMuscular_Group_Exercise: updateMuscular_Group_Exercise,
        message: 'Muscular_Group_Exercise atualizado com sucesso.',
      };
      res.json(response);
    } else {
      res.json({message: 'Muscular_Group_Exercise não encontrado.'});
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
