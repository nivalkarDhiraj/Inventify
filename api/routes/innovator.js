const express = require('express');
const router = express.Router();
const userController = require('../controllers/innovator');
const checkAuth = require('../middlewares/checkAuth');

router.post('/signup', userController.signup); //user signup
router.post('/login', userController.login);   //user login

module.exports = router;
