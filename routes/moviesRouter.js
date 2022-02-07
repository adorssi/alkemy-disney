const express = require('express');
var router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.list);
router.get('/search', moviesController.search);
router.post('/', moviesController.add);
router.put('/:id', moviesController.update);
router.delete('/:id', moviesController.delete);
router.get('/:id', moviesController.detail);


module.exports = router;