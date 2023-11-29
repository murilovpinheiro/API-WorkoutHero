const express = require('express');
const app = express();
const controller = require('../controllers/exerciseController')
const router = express.Router();
var bodyParser = require('body-parser')
const { buildExercise, buildExercisePage } = require('../middlewares/middlewares');
const { where } = require('sequelize');

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
    let whereClause = req.clause;

    console.log("req.clause: ", req.clause);
    console.log("whereClause: ", whereClause);

    let offset = 0;
    let limit = 10;

    if(whereClause){
      if(whereClause.offset){

        console.log("offset = ", offset);

        offset = whereClause.offset;

        delete whereClause.offset;
      }
      if(whereClause.limit){

        console.log("limit = ", limit);

        limit = whereClause.limit;

        delete whereClause.limit;
      }
    }

    console.log(whereClause);

    let response = await ExerciseController.getExercisePage2By(whereClause, (offset != 0 ? offset : 0), (limit != 10 ? limit: 10));
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
  