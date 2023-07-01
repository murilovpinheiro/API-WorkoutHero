const express = require('express');
const app = express();
const controller = require('../controllers/exerciseController')
const router = express.Router();
var bodyParser = require('body-parser')
const { buildExercise } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const ExerciseController = new controller();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildExercise, async (req, res) => {
    const whereClause = req.cla ;
    //console.log(whereClause)

    let response = await ExerciseController.getExerciseBy(whereClause);
    res.json(response)
  });
  
  router.post('/delete', urlencodedParser, async (req, res) => {
    const {id} = req.body;
    
    let response = await ExerciseController.deleteExerciseBy(id)
    res.json(response)
  });
  
  router.post('/insert',urlencodedParser, async (req, res) => {
    const { id, name, difficulty, sets, reps, weight, obj, reps_progress, weight_progress, rest} = req.body;
    //console.log(req.body);

    let response = await ExerciseController.createExercise( id, name, difficulty, sets, reps, weight, obj, reps_progress, weight_progress, rest)
    res.json(response)
  });
  
  router.post('/update', urlencodedParser, buildExercise, async (req, res) => {
    const {id, ...updateClause} = req.clause;
    
    let response = await ExerciseController.updateExercise(id, updateClause)
    res.json(response)
  });
  
  module.exports = router
  