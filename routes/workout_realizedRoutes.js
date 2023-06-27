const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/workout_realizedController');
var bodyParser = require('body-parser')
const { buildWorkoutRealized } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const WorkoutRealizedController = new controller();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildWorkoutRealized, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  let response = await WorkoutRealizedController.getWorkoutRealizedBy(whereClause)
  res.json(response)
});

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;
  
  let response = await WorkoutRealizedController.deleteWorkoutRealizedBy(id)
  res.json(response)
});

router.post('/insert', urlencodedParser, async (req, res) => {
  const { id, date_, duration, workout_id, historic_id} = req.body;
  //console.log(req.body);
  
  let response = await WorkoutRealizedController.createWorkoutRealized(id, date_, duration, workout_id, historic_id)
  res.json(response)
});

router.post('/update', urlencodedParser, buildWorkoutRealized, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  
  let response = await WorkoutRealizedController.updateWorkoutRealized(id, updateClause)
  res.json(response)
});

module.exports = router
