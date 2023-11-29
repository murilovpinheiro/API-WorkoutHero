const express = require('express');
const app = express();
const controller = require('../controllers/exerciseController')
const router = express.Router();
var bodyParser = require('body-parser')
const { buildExercise, buildExercisePage } = require('../middlewares/middlewares');

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

  router.get('/selectPage', urlencodedParser, buildExercisePage, async (req, res) => {
    const {whereClause} = req.clause;
    console.log(whereClause);
    let offset = 0;
    let limit = 0;
    if(whereClause){
      if(whereClause.offset && whereClause.limit){
        offset = whereClause.offset;
        limit = whereClause.limit;
      }
      whereClause = {
        id: whereClause.id, 
        name: whereClause.name, 
        difficulty: whereClause.difficulty, 
        sets: whereClause.sets, 
        reps: whereClause.reps, 
        weight: whereClause.weight, 
        obj: whereClause.obj, 
        reps_progress: whereClause.reps_progress, 
        weight_progress: whereClause. weight_progress, 
        rest: whereClause, 
        muscles: whereClause, 
        body_part: whereClause
      }
    }

    let response = await ExerciseController.getExercisePage2By(whereClause, (offset ? offset : 0), (limit ? limit: 10));
    res.json(response)
  });
  
  router.post('/delete', urlencodedParser, async (req, res) => {
    const {id} = req.body;
    
    let response = await ExerciseController.deleteExerciseBy(id)
    res.json(response)
  });
  
  router.post('/insert',urlencodedParser, async (req, res) => {
    const { id, name, difficulty, sets, reps, weight, obj, reps_progress, weight_progress, rest, muscles, body_part} = req.body;
    //console.log(req.body);

    let response = await ExerciseController.createExercise( id, name, difficulty, sets, reps, weight, obj, reps_progress, weight_progress, rest, muscles, body_part)
    res.json(response)
  });
  
  router.post('/update', urlencodedParser, buildExercise, async (req, res) => {
    const {id, ...updateClause} = req.clause;
    
    let response = await ExerciseController.updateExercise(id, updateClause)
    res.json(response)
  });
  
  module.exports = router
  