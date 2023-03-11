// MODULES
const express = require('express');
const updateController = require('../controllers/updateController');
const myReadRequestBody = require('../middlewares/myReadRequestBody');

// INIT
const router = express.Router();

// HTTP REQUEST
router 
  .route('/') 
  .put(
    myReadRequestBody,
  
    updateController.updateUser
  );
// EXPORT
module.exports = router;