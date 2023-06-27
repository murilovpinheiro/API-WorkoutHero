const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/routine_workoutController')
var bodyParser = require('body-parser')
const { buildRoutineWorkouts } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const RoutineWorkoutController = new controller();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildRoutineWorkouts, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)

  let response = await RoutineWorkoutController.getRoutineWorkoutBy(whereClause)
  res.json(response)
});

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;
  let response = await RoutineWorkoutController.deleteRoutineWorkoutBy(id)
  res.json(response)
});

router.post('/insert', urlencodedParser, async (req, res) => {
  const { id, routine_id, workout_id} = req.body;
  //console.log(req.body);
  
  let response = await RoutineWorkoutController.createRoutineWorkout( id, routine_id, workout_id)
  res.json(response)
});

router.post('/update', urlencodedParser, buildRoutineWorkouts, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  
  let response = await RoutineWorkoutController.updateRoutineWorkout( id, updateClause)
  res.json(response)
});

module.exports = router
