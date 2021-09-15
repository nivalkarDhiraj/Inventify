const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/idea');
const checkAuth = require('../middlewares/checkAuth');

router.post('/part1', ideaController.postIdea1); 
router.patch('/part2', ideaController.postIdea2); 
router.patch('/part3', ideaController.postIdea3); 

module.exports = router;
