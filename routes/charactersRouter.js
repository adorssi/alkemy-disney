const express = require('express');
var router = express.Router();
const charactersController = require('../controllers/charactersController');

router.get('/', charactersController.list);
router.post('/', charactersController.add);
router.put('/:id', charactersController.update);
router.delete('/:id', charactersController.delete);
router.get('/:id', charactersController.detail);


module.exports = router;