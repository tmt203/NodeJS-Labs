const express = require('express');
const homeController = require('./../controllers/homeController');
const router = express.Router();

router 
  .route('/') 
  .get(homeController.getHome)
  .post(homeController.addUser)
  .put(homeController.updateUser)
  .delete(homeController.deleteUser);
  
module.exports = router;