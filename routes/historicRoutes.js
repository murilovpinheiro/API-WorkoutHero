const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controllers/historicController')
var bodyParser = require('body-parser')
const { buildHistoric } = require('../middlewares/middlewares');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const HistoricController = new controller();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildHistoric, async (req, res) => {
  const whereClause = req.clause;
  //console.log(whereClause)
  
  let response = await HistoricController.getHistoricBy(whereClause)
  res.json(response)
});

router.post('/delete', urlencodedParser, async (req, res) => {
  const {id} = req.body;
  let response = await HistoricController.deketeHistoricBy(id)
  res.json(response)
});

router.post('/insert', urlencodedParser, async (req, res) => {
  const { id, user_id, days_trained, weights_lifted, reps_done, time_training} = req.body;
  //console.log(req.body);
  
  let response = await HistoricController.createHistoric(id, user_id, days_trained, weights_lifted, reps_done, time_trainingd)
  res.json(response)

});

router.post('/update', urlencodedParser, buildHistoric, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  
  let response = await HistoricController.updateHistoric(id, updateClause)
  res.json(response)

});

module.exports = router
