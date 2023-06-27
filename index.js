const express = require('express');
const app = express();
const path = require('path');

const {User, sequelize} = require('./src/models/userModel');

const userRoutes = require('./src/routes/userRoutes')
const routineRoutes = require('./src/routes/routineRoutes')
const exerciseRoutes = require('./src/routes/exerciseRoutes');
const historicRoutes = require('./src/routes/historicRoutes');
const muscular_group_exerciseRoutes = require('./src/routes/muscular_group_exerciseRoutes');
const muscular_groupRoutes = require('./src/routes/muscular_groupRoutes');
const routine_workoutsRoutes = require('./src/routes/routine_workoutsRoutes');
const workout_exerciseRoutes = require('./src/routes/workout_exerciseRoutes');
const workout_realizedRoutes = require('./src/routes/workout_realizedRoutes');
const workoutRoutes = require('./src/routes/workoutRoutes');

const routes = require('./htmlRoutes');

const port = 3000;

app.use("/user", userRoutes)
app.use("/routine", routineRoutes)
app.use("/exercise", exerciseRoutes)
app.use("/historic", historicRoutes)
app.use("/muscular_group_exercise", muscular_group_exerciseRoutes)
app.use("/muscular_group", muscular_groupRoutes)
app.use("/routine_workouts", routine_workoutsRoutes)
app.use("/workout_exercise", workout_exerciseRoutes)
app.use("/workout_realized", workout_realizedRoutes)
app.use("/workout", workoutRoutes)

app.use('/form', routes);

app.get('/', (req, res) => {
  res.send('Bem-vindo à minha API!');
});

sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.');
  })
  .catch(error => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
  });

app.listen(port, async () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});