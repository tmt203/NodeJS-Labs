const express = require('express');
const homeController = require('./../controllers/homeController');

const router = express.Router();

router
    .route('/')
    .get(homeController.getAllProducts)
    .post(homeController.addProduct);

router 
    .route('/:id')
    .delete(homeController.deleteProduct);

module.exports = router;