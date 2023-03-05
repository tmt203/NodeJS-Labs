const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router
  .route('/:id') 
  .get(userController.getUserById);
  
module.exports = router;