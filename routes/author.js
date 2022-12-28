const express = require('express');
const {faker} = require('@faker-js/faker');
const router = express.Router();

const authorSchema = require('../models/authorSchema');
const bookSchema = require('../models/bookSchema');

router.post('/', async (req, res) => {
    const author = await authorSchema.create({
        Name : req.body.Name,
        PhNo : req.body.Number,
        email : req.body.email
    });

    if(author){
        // const book = await bookSchema.create({
        //     title : req.body.title,
        //     likes : Math.floor(Math.random() * 20),
        //     author : author._id
        // });

        // if(book)
        //     res.json({Author : author, Book : book});
        // else
            res.json(author);
    
    } else {
        res.json({Msg : "Author not created"});
    }
})

router.get('/', async (req, res) =>{
    const authors = await authorSchema.find();

    if(authors)
        res.json(authors);
    else
        res.json({Msg : 'No Author Present'})

});

router.put('/:id', async (req, res) => {
    let toUpdate = {};
    req.body.Name?(toUpdate.Name = req.body.Name) : "";
    req.body.PhNo?(toUpdate.PhNo = req.body.PhNo) : "";
    req.body.email?(toUpdate.email = req.body.email) : "";

    const author = await authorSchema.findByIdAndUpdate(req.params.id, { $set : toUpdate});

    if(author)
        res.json(author);
    else
        res.json({Msg : 'Author not Updated'});

});

router.delete('/:id', async (req, res)=>{
    const con = await authorSchema.findByIdAndDelete(req.params.id);
    res.json(con);
})

router.get('/me', async (req, res) =>{
    const author = await authorSchema.findById(req.user.id);

    if(author)
        res.json(author);
    else
        res.json({Msg : 'No Author Present'});
});

router.get('/:id', async (req, res) =>{
    const author = await authorSchema.findById(req.params.id);

    if(author)
        res.json(author);
    else
        res.json({Msg : 'No Author Present'});
});

module.exports = router;