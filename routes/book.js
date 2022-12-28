const express = require('express');
const router = express.Router();

const bookSchema = require('../models/bookSchema');

router.get('/', async (req, res) =>{
    const books = await bookSchema.find();

    if(books)
        res.json(books);
    else
        res.json({Msg : "No books"});
    
})

router.put('/like/:id', async (req, res) =>{
    const books = await bookSchema.find();

    if(books)
        res.json(books);
    else
        res.json({Msg : "No books"});
    
})

router.put('/unlike/:id', async (req, res) =>{
    const books = await bookSchema.find();

    if(books)
        res.json(books);
    else
        res.json({Msg : "No books"});
    
})

module.exports = router;