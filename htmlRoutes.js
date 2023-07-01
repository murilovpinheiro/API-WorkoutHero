const express = require('express');
const path = require('path');
const app = express();

const router = express.Router();

router.get('/user_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/userPlaceholders/user_insertForm.html'));
  });
  
  router.get('/user_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/userPlaceholders//user_selectForm.html'));
  });
  
  router.get('/user_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/userPlaceholders/user_deleteForm.html'));
  });
  
  router.get('/user_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/userPlaceholders/user_updateForm.html'));
  });
  
  router.get('/routine_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/routinePlaceholders/routine_insertForm.html'));
  });
  
  router.get('/routine_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/routinePlaceholders/routine_selectForm.html'));
  });

  router.get('/routine_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/routinePlaceholders/routine_deleteForm.html'));
  });
  
  router.get('/routine_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/routinePlaceholders/routine_updateForm.html'));
  });

  router.get('/exercise_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/exercisePlaceholders/exercise_insertForm.html'));
  });
  
  router.get('/exercise_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/exercisePlaceholders/exercise_selectForm.html'));
  });

  router.get('/exercise_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/exercisePlaceholders/exercise_deleteForm.html'));
  });
  
  router.get('/exercise_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/exercisePlaceholders/exercise_updateForm.html'));
  });

  router.get('/historic_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/historicPlaceholders/historic_insertForm.html'));
  });
  
  router.get('/historic_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/historicPlaceholders/historic_selectForm.html'));
  });

  router.get('/historic_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/historicPlaceholders/historic_deleteForm.html'));
  });
  
  router.get('/historic_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/historicPlaceholders/historic_updateForm.html'));
  });

  router.get('/muscular_group_exercise_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/muscular_group_exercisePlaceholders/muscular_group_exercise_insertForm.html'));
  });
  
  router.get('/muscular_group_exercise_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/muscular_group_exercisePlaceholders/muscular_group_exercise_selectForm.html'));
  });

  router.get('/muscular_group_exercise_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/muscular_group_exercisePlaceholders/muscular_group_exercise_deleteForm.html'));
  });
  
  router.get('/muscular_group_exercise_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/muscular_group_exercisePlaceholders/muscular_group_exercise_updateForm.html'));
  });

  router.get('/muscular_group_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/muscular_groupPlaceholders/muscular_group_insertForm.html'));
  });
  
  router.get('/muscular_group_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/muscular_groupPlaceholders/muscular_group_selectForm.html'));
  });

  router.get('/muscular_group_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/muscular_groupPlaceholders/muscular_group_deleteForm.html'));
  });
  
  router.get('/muscular_group_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/muscular_groupPlaceholders/muscular_group_updateForm.html'));
  });

  router.get('/routine_workout_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/routine_workoutPlaceholders/routine_workout_insertForm.html'));
  });
  
  router.get('/routine_workout_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/routine_workoutPlaceholders/routine_workout_selectForm.html'));
  });

  router.get('/routine_workout_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/routine_workoutPlaceholders/routine_workout_deleteForm.html'));
  });
  
  router.get('/routine_workout_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/routine_workoutPlaceholders/routine_workout_updateForm.html'));
  });

  router.get('/workout_exercise_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workout_exercisePlaceholders/workout_exercise_insertForm.html'));
  });
  
  router.get('/workout_exercise_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workout_exercisePlaceholders/workout_exercise_selectForm.html'));
  });

  router.get('/workout_exercise_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workout_exercisePlaceholders/workout_exercise_deleteForm.html'));
  });
  
  router.get('/workout_exercise_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workout_exercisePlaceholders/workout_exercise_updateForm.html'));
  });

  router.get('/workout_realized_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workout_realizedPlaceholders/workout_realized_insertForm.html'));
  });
  
  router.get('/workout_realized_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workout_realizedPlaceholders/workout_realized_selectForm.html'));
  });

  router.get('/workout_realized_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workout_realizedPlaceholders/workout_realized_deleteForm.html'));
  });
  
  router.get('/workout_realized_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workout_realizedPlaceholders/workout_realized_updateForm.html'));
  });

  router.get('/workout_insert', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workoutPlaceholders/workout_insertForm.html'));
  });
  
  router.get('/workout_select', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workoutPlaceholders/workout_selectForm.html'));
  });

  router.get('/workout_delete', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workoutPlaceholders/workout_deleteForm.html'));
  });
  
  router.get('/workout_update', (req, res) => {
    res.sendFile(path.join(__dirname, './html/workoutPlaceholders/workout_updateForm.html'));
  });
module.exports = router;
