const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/idea');
const checkAuth = require('../middlewares/checkAuth');


router.post('/part1', checkAuth, ideaController.postIdea1); 
router.patch('/part2', checkAuth, ideaController.postIdea2); 
router.patch('/part3', checkAuth, ideaController.postIdea3); 
router.get("", checkAuth, ideaController.getAll);
router.get("/:ideaId", checkAuth, ideaController.getOne);
router.post("/:ideaId/interested", checkAuth, ideaController.interested);

module.exports = router;
