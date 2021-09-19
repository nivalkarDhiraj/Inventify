const express = require('express');
const router = express.Router();
const innovatorController = require('../controllers/innovator');
const checkAuth = require('../middlewares/checkAuth');

router.post('/signup', innovatorController.signup); 
router.post('/login', innovatorController.login);  
router.get('/:innovatorId', innovatorController.profile);

module.exports = router;
