const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/workoutController');
var bodyParser = require('body-parser');
const { buildWorkout } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const WorkoutController = new controller();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildWorkout, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  
  let response = await WorkoutController.getWorkoutBy(whereClause)
  res.json(response)
});

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;
  
  let response = await WorkoutController.deleteWorkoutBy(id)
  res.json(response)
});

router.post('/delete2', urlencodedParser, buildWorkout, async (req, res) => {
  const {id} = req.clause;
  
  let response = await WorkoutController.deleteWorkoutBy(id)
  res.json(response)
});

router.post('/insert', urlencodedParser, buildWorkout, async (req, res) => {
  const { id, difficulty, obj, user_id} = req.body;
  console.log('BODY: ', req.body);
  
  let response = await WorkoutController.createWorkout(id, difficulty, obj, user_id)
  res.json(response)
});

router.post('/insert2', urlencodedParser, buildWorkout, async (req, res) => {
  const { id, difficulty, obj, user_id} = req.clause;
  console.log('Clause: ', req.clause);
  
  let response = await WorkoutController.createWorkout(id, difficulty, obj, user_id)
  res.json(response)
});

router.post('/update', urlencodedParser, buildWorkout, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  let response = await WorkoutController.updateWorkout(id, updateClause)
  res.json(response)
});

module.exports = router
