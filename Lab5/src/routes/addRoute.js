// MODULES
const express = require('express');
const { check, validationResult } = require('express-validator');

const addController = require('../controllers/addController');
const myReadRequestBody = require('./../middlewares/myReadRequestBody');

// INIT
const router = express.Router();
const validateRequest = [
  check('name').notEmpty().withMessage('Name must be filled.'),
  check('email').notEmpty().withMessage('Email must not be empty.').isEmail().withMessage('Please enter a valid email.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorString = errors.array().map(e => e.msg).join(' ');
      return res.render('error', { title: "Lỗi", error: { code: 422, title: "Input mismatch error", desc: errorString }, style: "error.css" })
    }
    next();
  }
];

// REQUEST METHODS
router
  .route('/')
  .get(addController.add)
  .post(
    myReadRequestBody,
    validateRequest,
    addController.addUser
  );

// EXPORT
module.exports = router;