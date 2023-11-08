const express = require('express');
const app = express();
const controller = require('../controllers/exerciseController')
const router = express.Router();
var bodyParser = require('body-parser')
const { buildExercise } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const ExerciseController = new controller();

router.get('/select', urlencodedParser, buildExercise, async (req, res) => {
    const whereClause = req.clause;

    let response = await ExerciseController.getExerciseBy(whereClause);
    res.json(response)
  });

router.get('/select2', urlencodedParser, buildExercise, async (req, res) => {
    const whereClause = req.clause;

    let response = await ExerciseController.getExercise2By(whereClause);
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
  