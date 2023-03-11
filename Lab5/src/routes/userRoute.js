// MODULES
const express = require('express');
const userController = require('../controllers/userController');
const myReadRequestBody = require('../middlewares/myReadRequestBody');

// INIT
const router = express.Router();

// HTTP REQUEST
router 
  .route('/:id') 
  .get(myReadRequestBody, userController.getUser);

// EXPORT
module.exports = router;