const express = require('express');
const {faker} = require('@faker-js/faker');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authorSchema = require('../models/authorSchema');
const bookSchema = require('../models/bookSchema');
const config = require('../config');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/', async (req, res) => {
    const data = {
        Name : req.body.Name,
        PhNo : req.body.Number,
        email : req.body.email
    };

    const accessToken = jwt.sign(data, config.jwt_secret_key);
    console.log(accessToken);
    const author = await authorSchema.create(data);

    if(author){
        res.json({Author : author, accessToken : accessToken});    
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

router.put('/', isAuthenticated, async (req, res) => {

    const author = await authorSchema.findOne({email :req.user.email});
    console.log(req.user.email);

    if(author){
        let toUpdate = {};
        req.body.Name?(toUpdate.Name = req.body.Name) : "";
        req.body.PhNo?(toUpdate.PhNo = req.body.PhNo) : "";

        const updatedAuthor = await authorSchema.findByIdAndUpdate(author._id, { $set : toUpdate});

        if(updatedAuthor)
            res.json(updatedAuthor);
        else
            res.json({Msg : 'Author not Updated'});
    } else {
        res.json({Msg : 'Author not found'});
    }

});

router.delete('/', isAuthenticated, async (req, res)=>{
    const author = await authorSchema.findOne({email :req.user.email});
    const con = await authorSchema.findByIdAndDelete(author._id);
    res.json(con);
})

router.get('/me', isAuthenticated, async (req, res) =>{
    const author = await authorSchema.findOne({email :req.user.email});

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