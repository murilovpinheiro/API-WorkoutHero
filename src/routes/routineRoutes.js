const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/routineController');
var bodyParser = require('body-parser');
const { buildRoutine } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const RoutineController = new controller();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildRoutine, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  
  let response = await RoutineController.getRoutineBy(whereClause)
  res.json(response)
});

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;
  
  let response = await RoutineController.deleteRoutineBy(id)
  res.json(response)
});

router.post('/insert',urlencodedParser, async (req, res) => {
  const { id, user_creator_id} = req.body;
  //console.log(req.body);

  let response = await RoutineController.createRoutine(id, user_creator_id)
  
  res.json(response)
});

router.post('/update', urlencodedParser, buildRoutine, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  
  let response = await RoutineController.updateRoutine(id, updateClause)
  res.json(response)
});

module.exports = router
