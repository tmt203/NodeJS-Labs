const express = require('express');
const userController = require('../controllers/userController');
const homeController = require('./../controllers/homeController');
const router = express.Router();

router 
  .route('/') 
  .get(homeController.getHome)
  .delete(homeController.logOut);
  
module.exports = router;