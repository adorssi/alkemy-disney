const express = require('express');
var router = express.Router();
const charactersController = require('../controllers/charactersController');

router.get('/', charactersController.list);
router.post('/add', charactersController.add);
router.put('/update/:id', charactersController.update);
router.delete('/:id', charactersController.delete);
router.get('/:id', charactersController.detail);


module.exports = router;