const express = require('express');
const app = express();
const controller = require('../controllers/userController')
const router = express.Router();
var bodyParser = require('body-parser')
const { buildUser } = require('../middlewares/middlewares');
const historic = require("../controllers/historicController")
const crypto = require('crypto');
const mailer = require('../models/mailer')
const { User } = require('../models/userModel');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const UserController = new controller();
const HistoricController = new historic();

//mudança do all para depois, em vez de ficar todos os valores id: numero/n, name: nome, ficar só uma lista {numero, nome,...} discutir isso com eles depois
//USO o urlencodedParser pra deixar todo na tipagem do javascript e deixar mais fácil de mexer
router.get('/select', urlencodedParser, buildUser, async (req, res) => {
  const whereClause = req.clause;

  let response = await UserController.getUserBy(whereClause);
  
  res.json(response);
  //console.log(whereClause)
});

// esse register pe desnecessário, também, o select insert aceita o obj e xp como vazio, sem problema e o build user já cuida dos vazios
router.post('/register', urlencodedParser, buildUser, async (req, res) => {
  const {name, login, pass, weight, height, sex} = req.clause;
  const age = 20;
  let response;
  console.log("Criando User")
  let user_response = await UserController.registerUser(name, login, pass, age, weight, height, sex);
  if(user_response.sucess){
    console.log("Criando Hist")
    let id = user_response.lastid;
    console.log("new user id: ", id)
    //console.log("createUser Response: ", response.createUserResponse)

    let historic_response = await HistoricController.createHistoric(id+1, id, 0, 0, 0, 0);

    if(historic_response.sucess) response = {sucess: true, newUser: user_response.newUser}
    else response = {
      sucess: false, 
      message: "Historic creation error", 
      historic_response: historic_response
    }

  }
  else response = {
    sucess: false, 
    message: "User creation error", 
    user_response: user_response
  }

  console.log("response: ", response)
  res.json(response);
});

router.post('/insert', urlencodedParser, buildUser, async (req, res) => {
  const { id, name, login, pass, age, weight, height, sex, obj, xp} = req.clause;

  let response = await UserController.createUser(id, name, login, pass, age, weight, height, sex, obj, xp);

  res.json(response);
  //console.log(req.body);
  
});

router.post('/update', urlencodedParser, buildUser, async (req, res) => {
  const {id, ...updateClause} = req.clause;
  
  let response  = await UserController.updateUser(id, updateClause);

  res.json(response);
});

router.post('/forgot_password', urlencodedParser, buildUser, async (req, res) => {
  
  const { login } = req.clause;

  console.log("LOGIN:", login)

  try {

    let user = await UserController.getUserBy({ login }) // TODO: isso aqui funciona?
    user = user[0]

    console.log('USUARIO ANTES', user)

    if (!user) {
      console.log('erro 400: usuario nao encontrado')
      res.status(400).json({
        sucess: false,
        message: 'Usuario nao encontrado',
      })
    }

    const token = crypto.randomBytes(20).toString('hex');
    
    const now = new Date()
    now.setHours(now.getHours() + 1)

    console.log('novos atributos: ', now, token)
    console.log('user.id: ', user.id)

    let response = await UserController.updateUser(parseInt(user.id),
      // TODO: como encaixar uma whereclause aqui? 
      {
        passResetToken: token,
        passResetExpires: now,
      } 
    )

    mailer.sendMail({
      to: login,
      from: 'thomaz.aluno@alu.ufc.br',
      template: 'auth/forgot_pass',
      context: { login, token },

    }, (err) => {
      if (err) {
        console.log('400: erro ao mandar email: ', err)
        return res.status(400).json({
          sucess: false,
          message: 'Erro ao mandar o email',
        })
      }

      res.json(response)
    })

  } catch (err) {
    console.log('400: erro no forgot password, tente de novo: ', err)
    res.status(400).json({
      sucess: false,
      message: 'Usuario nao encontrado',
    })
  }
})

router.post('/reset_password', urlencodedParser, buildUser, async (req, res) => {
  const { login, token, password } = req.clause;

  console.log('login token e senha: ', login, token, password);

  try {

    let user = await UserController.getUserBy({login}) // TODO: isso aqui funciona?
    user = user[0];

    console.log('USUARIO INDO TROCAR DE SENHA:', user)
    console.log('TOKEN DO USUARIO', user.passResetToken);
    // TODO: precisa pegar tambem o token e a data de expiracao

    if (!user) {
      console.log('erro 400: usuario nao encontrado')
      res.status(400).json({
        sucess: false,
        message: 'Usuario nao encontrado',
      })
    }

    if (token !== user.passResetToken) {
      console.log('erro 400: token invalido')
      res.status(400).json({
        sucess: false,
        message: 'Token invalido',
        tokenErrado: token,
        tokenCerto: user.passResetToken
      })
    }
      
    const now = new Date()

    if (now > user.passResetExpires) {
      console.log('erro 400: token expirado')
      res.status(400).json({
        sucess: false,
        message: 'Token expirado',
      })
    }

    // TODO: SALVAR USUARIO NO BANCO COM SENHA NOVA
    let response = await UserController.updateUser(parseInt(user.id),
      // TODO: como encaixar uma whereclause aqui? 
      {
        pass: password,
        // passResetToken: null,
        // passResetExpires: null
      }
    )

    res.json(response);

  } catch (err) {
    res.status(400).json({error: 'Não conseguiu resetar a senha, tentar novamente'})
  }
})

module.exports = router;
