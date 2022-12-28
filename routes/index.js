const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send("Welcome to Microservice API"));

router.use('/authors', require('./author'));
router.use('/books', require('./book'));

module.exports = router;