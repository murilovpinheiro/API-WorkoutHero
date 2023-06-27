const express = require('express');
const path = require('path');
const app = express();

const router = express.Router();

router.get('/user_insert', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/userPlaceholders/user_insertForm.html'));
  });
  
  router.get('/user_select', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/userPlaceholders//user_selectForm.html'));
  });
  
  router.get('/user_delete', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/userPlaceholders/user_deleteForm.html'));
  });
  
  router.get('/user_update', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/userPlaceholders/user_updateForm.html'));
  });
  
  router.get('/routine_insert', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/routinePlaceholders/routine_insertForm.html'));
  });
  
  router.get('/routine_select', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/routinePlaceholders/routine_selectForm.html'));
  });

  router.get('/routine_delete', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/userPlaceholders/routine_deleteForm.html'));
  });
  
  router.get('/user_update', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/userPlaceholders/routine_updateForm.html'));
  });

module.exports = router;
