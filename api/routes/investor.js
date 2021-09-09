const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investor');
const checkAuth = require('../middlewares/checkAuth');

router.post('/signup', investorController.signup);
router.post('/login', investorController.login);

module.exports = router;
