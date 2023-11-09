const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/workout_exerciseController');
var bodyParser = require('body-parser')
const { buildWorkoutExercise } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const WorkoutExerciseController = new controller();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildWorkoutExercise, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  
  let response = await WorkoutExerciseController.getWorkoutExerciseBy(whereClause)
  res.json(response)
});

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;
  
  let response = await WorkoutExerciseController.deleteWorkoutExerciseBy(id)
  res.json(response)
});

router.post('/insert', urlencodedParser, async (req, res) => {
  const {id, workout_id, exercise_id} = req.body;
  //console.log(req.body);
  
  let response = await WorkoutExerciseController.createWorkoutExercise(id, workout_id, exercise_id)
  res.json(response)
});

router.post('/insert2', urlencodedParser, buildWorkoutExercise, async (req, res) => {
  console.log('INSERT2 REQCLAUSE: ', req.clause);
  const {id, workout_id, exercise_id} = req.clause;
  
  let response = await WorkoutExerciseController.createWorkoutExercise(id, workout_id, exercise_id)
  res.json(response)
});

router.post('/update', urlencodedParser, buildWorkoutExercise, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  
  let response = await WorkoutExerciseController.updateWorkoutExercise(id, updateClause)
  res.json(response)
});

module.exports = router
