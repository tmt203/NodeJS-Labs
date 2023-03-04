const express = require('express');
const updateController = require('./../controllers/updateController');

const router = express.Router();

router 
    .route('/:id') 
    .get(updateController.getUpdateProduct)
    .put(updateController.updateProduct);
    
module.exports = router;
