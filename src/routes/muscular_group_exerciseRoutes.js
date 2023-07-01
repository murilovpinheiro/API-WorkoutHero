const express = require('express');
const app = express();
const controller = require('../controllers/muscular_group_exerciseController')
const router = express.Router();
var bodyParser = require('body-parser')
const { buildMuscularGroupExercise } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const MuscularGroupExerciseController = new controller();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildMuscularGroupExercise, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  let response = await MuscularGroupExerciseController.getMuscularGroupExerciseBy(whereClause)
  res.json(response)
});

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;

  let response = await MuscularGroupExerciseController.deleteMuscularGroupExerciseBy(id)
  res.json(response)
});

router.post('/insert', urlencodedParser, async (req, res) => {
  const { id, muscular_group_id, exercise_id} = req.body;
  //console.log(req.body);
  let response = await MuscularGroupExerciseController.createMuscularGroupExercise(id, muscular_group_id, exercise_id)
  res.json(response)
});

router.post('/update', urlencodedParser, buildMuscularGroupExercise, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  
  let response = await MuscularGroupExerciseController.createMuscularGroupExercise(id, updateClause)
  res.json(response)
});

module.exports = router
