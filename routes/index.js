const router = require('express').Router();

const movieDbRouter = require('./movie-db');

router.use('/movie-db', movieDbRouter);

module.exports = router;