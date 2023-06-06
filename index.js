const express = require('express');
const app = express();
const {User, sequelize} = require('./models/userModel');
const {Routine} = require('./models/routineModel');
const {Workout} = require('./models/workoutModel');
const {Exercise} = require('./models/exerciseModel');
const {Workout_Exercise} = require('./models/workout_exerciseModel');
const {Routine_Workouts} = require('./models/routine_workoutsModel');

const port = 3000;

app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.\n');

    User.create({
      id: 4,
      name: 'Natan',
      login: 'TESTE3@example.com',
      pass: 'senhasenha',
      age: 17,
      weight: 22,
      height: 22,
    })
      .then(newUser => {
        console.log(newUser);
        console.log('Inserção do usuário foi efetuada corretamente.\n');
      })
      .catch(error => {
        console.error(error.parent.sql);
        console.error("Valores:", error.parent.parameters);
        console.error("ERROR MESSAGE: ", error.errors[0].message, "\n");
      }).then(() => {
        Routine.create({
          id: 5,
          user_creator_id: 4
        })
          .then(newRoutine => {
            //console.log(newRoutine);
            console.log('Inserção da rotina foi efetuada corretamente.\n');
          })
          .catch(error => {
            console.error(error.parent.sql);
            console.error("Valores:", error.parent.parameters);
            console.error("ERROR MESSAGE: ", error.parent.detail, "\n");
          });
      });
  })
  .catch(error => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
  });



app.listen(port, async () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

