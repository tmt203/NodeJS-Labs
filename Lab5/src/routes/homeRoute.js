// MODULES
const express = require('express');
const { check, validationResult } = require('express-validator');

const homeController = require('./../controllers/homeController');
const myReadRequestBody = require('../middlewares/myReadRequestBody');


// INIT
const router = express.Router();

// REQUEST METHODS
router
  .route('/') 
  .get(homeController.home)  
  .delete(
    myReadRequestBody, 
    homeController.deleteUser
  );

// EXPORT
module.exports = router;