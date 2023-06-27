const express = require('express');
const app = express();
const controller = require('../controllers/muscular_groupController')
const router = express.Router();
var bodyParser = require('body-parser')
const { buildMuscularGroup } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const MuscularGroupController = new controller();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildMuscularGroup, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  
  let response = await MuscularGroupController.getMuscularGroupExerciseBy(whereClause)
  res.json(response)
});

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;
  
  let response = await MuscularGroupController.deleteMuscularGroupExerciseBy(id)
  res.json(response)
});

router.post('/insert', urlencodedParser, async (req, res) => {
  const { id, name} = req.body;
  //console.log(req.body);

  let response = await MuscularGroupController.createMuscularGroup(id, name)
  res.json(response)
});

router.post('/update', urlencodedParser, buildMuscularGroup, async (req, res) => {
  const {id, ...updateClause} = req.clause;

  let response = await MuscularGroupController.updateMuscularGroupExercise(id, updateClause)
  res.json(response)
});

module.exports = router
