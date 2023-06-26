const express = require('express');
const app = express();
const {Workout_Realized, sequelize} = require('../models/workout_realizedModel');
const router = express.Router();
var bodyParser = require('body-parser')
const { buildWorkoutRealized } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildWorkoutRealized, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  try{
      const records = (await Workout_Realized.findAll({
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
   const numDeleted = await Workout_Realized.destroy({
      where: {
        id: id
      }
    });
    console.log(numDeleted);
    if (numDeleted >= 1){
      res.json({message: "workout_realized excluído com sucesso."});
    }
    else{
      res.json({message: "Nenhum workout_realized encontrado com o ID fornecido."});
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
  const { id, date_, duration, workout_id, historic_id} = req.body;
  //console.log(req.body);
  try {
    const newWorkout_Realized = await Workout_Realized.create({ // criando o workout_realized
      id: id,
      date_ : date_,
      duration: duration,
      workout_id: workout_id,
      historic_id: historic_id
    });

    const response = {
      newWorkout_Realized: newWorkout_Realized,
      message: 'Inserção do workout_realized foi efetuada corretamente.',
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

router.post('/update', urlencodedParser, buildWorkoutRealized, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  try {
    const workout_realized = await Workout_Realized.findByPk(id);
    if (workout_realized) {
      const updateWorkout_Realized = await workout_realized.update(updateClause);
      const response = {
        updateWorkout_Realized: updateWorkout_Realized,
        message: 'workout_realized atualizado com sucesso.',
      };
      res.json(response);
    } else {
      res.json({message: 'workout_realized não encontrado.'});
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
