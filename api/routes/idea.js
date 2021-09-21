const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/idea');
const checkAuth = require('../middlewares/checkAuth');


router.post('/part1', checkAuth, ideaController.postIdea1); 
router.patch('/part2', checkAuth, ideaController.postIdea2); 
router.patch('/part3', checkAuth, ideaController.postIdea3); 
router.get("", checkAuth, ideaController.getAll);
router.get("/tags", checkAuth, ideaController.getAllWithTags); 
router.get("/:ideaId", checkAuth, ideaController.getOne);
router.post("/:ideaId/interested", checkAuth, ideaController.interested);
router.post("/:ideaId/invest", checkAuth, ideaController.invest);

module.exports = router;
