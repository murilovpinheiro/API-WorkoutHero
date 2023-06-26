const express = require('express');
const app = express();
const {Routine_Workout, sequelize} = require('../models/routine_workoutsModel');
const router = express.Router();
var bodyParser = require('body-parser')
const { buildRoutineWorkouts } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildRoutineWorkouts, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  try{
      const records = (await Routine_Workout.findAll({
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
   const numDeleted = await Routine_Workout.destroy({
      where: {
        id: id
      }
    });
    console.log(numDeleted);
    if (numDeleted >= 1){
      res.json({message: "Routine_Workout excluído com sucesso."});
    }
    else{
      res.json({message: "Nenhum Routine_Workout encontrado com o ID fornecido."});
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
  const { id, routine_id, workout_id} = req.body;
  //console.log(req.body);
  try {
    const newRoutine_Workout = await Routine_Workout.create({ // criando o Routine_Workout
      id: id,
      routine_id: routine_id,
      workout_id: workout_id
    });

    const response = {
      newRoutine_Workout: newRoutine_Workout,
      message: 'Inserção do Routine_Workout foi efetuada corretamente.',
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

router.post('/update', urlencodedParser, buildRoutineWorkouts, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  try {
    const routine_workout = await Routine_Workout.findByPk(id);
    if (routine_workout) {
      const updateRoutine_Workout = await routine_workout.update(updateClause);
      const response = {
        updateRoutine_Workout: updateRoutine_Workout,
        message: 'Routine_Workout atualizado com sucesso.',
      };
      res.json(response);
    } else {
      res.json({message: 'routine_workout não encontrado.'});
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
