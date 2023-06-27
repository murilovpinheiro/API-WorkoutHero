const express = require('express');
const app = express();
const {Workout_Exercise, sequelize} = require('../models/workout_exerciseModel');
const router = express.Router();
var bodyParser = require('body-parser')
const { buildWorkoutExercise } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildWorkoutExercise, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  try{
      const records = (await Workout_Exercise.findAll({
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
   const numDeleted = await Workout_Exercise.destroy({
      where: {
        id: id
      }
    });
    console.log(numDeleted);
    if (numDeleted >= 1){
      res.json({message: "workout_exercise excluído com sucesso."});
    }
    else{
      res.json({message: "Nenhum workout_exercise encontrado com o ID fornecido."});
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
  const { id, name, login, pass, age, weight, height, sex, obj, xp, routine_id} = req.body;
  //console.log(req.body);
  try {
    const newWorkout_Exercise = await Workout_Exercise.create({ // criando o workout_exercise
      id: id,
      name: name,
      login: login,
      pass: pass,
      age: age,
      weight: weight,
      height: height,
      sex: sex,
      obj: obj,
      xp: xp,
      routine_id: routine_id,
    });

    const response = {
      newWorkout_Exercise: newWorkout_Exercise,
      message: 'Inserção do workout_exercise foi efetuada corretamente.',
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

router.post('/update', urlencodedParser, buildWorkoutExercise, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  try {
    const workout_exercise = await Workout_Exercise.findByPk(id);
    if (workout_exercise) {
      const updateWorkout_Exercise = await workout_exercise.update(updateClause);
      const response = {
        updateWorkout_Exercise: updateWorkout_Exercise,
        message: 'workout_exercise atualizado com sucesso.',
      };
      res.json(response);
    } else {
      res.json({message: 'workout_exercise não encontrado.'});
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