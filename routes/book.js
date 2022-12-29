const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();

const bookSchema = require('../models/bookSchema');
const authorSchema = require('../models/authorSchema');

router.use(isAuthenticated);

router.get('/', async (req, res) =>{
    const books = await bookSchema.find().sort({likes : -1}).populate('author');

    if(books)
        res.json(books);
    else
        res.json({Msg : "No books"});
    
});

router.get('/:id', async (req, res) =>{
    const books = await bookSchema.findById(req.params.id).populate('author');

    if(books)
        res.json(books);
    else
        res.json({Msg : "No book"});
    
});

router.post('/', async (req, res)=>{

    const author = await authorSchema.findOne({email :req.user.email});
    const book = await bookSchema.create({
        title : req.body.title,
        likes : 0,
        author : author._id
    });

    if(book)
        res.json({Author : author, Book : book});
    else
        res.json({Msg : "Book not created"});
    
});

router.put('/:id',isAuthenticated, async (req, res) =>{
    const author = await authorSchema.findOne({email :req.user.email});
    const check = await bookSchema.findById(req.params.id);

    if(author){
        if(author._id===check.author){

            let toUpdate = {};
            req.body.title?(toUpdate.title = req.body.title) : "";
            const book = await bookSchema.findByIdAndUpdate(req.params.id, { $set : toUpdate});

            if(book)
                res.json(book);
            else
                res.json({Msg : 'Book not Updated'});

        } else {
            res.json({Msg : 'Author not classified to Update'});
        }
    } else {
        res.json({Msg : 'Author not Present'});
    }
});

router.put('/like/:id', async (req, res) =>{
    const books = await bookSchema.findByIdAndUpdate(req.params.id, {$inc : {likes : 1}});

    if(books)
        res.json(books);
    else
        res.json({Msg : "No books"});
    
})

router.put('/unlike/:id', async (req, res) =>{
    const books = await bookSchema.findByIdAndUpdate(req.params.id, {$inc : {likes : -1}});

    if(books)
        res.json(books);
    else
        res.json({Msg : "No books"});
    
})

router.delete('/:id', isAuthenticated, async (req, res) =>{
    const author = await authorSchema.findOne({email :req.user.email});
    const check = await bookSchema.findById(req.params.id);

    if(author){
        if(author._id===check.author){

            const con = await bookSchema.findByIdAndDelete(req.params.id);
            res.json(con);

        } else {
            res.json({Msg : 'Author not classified to Delete'});
        }
    } else {
        res.json({Msg : 'Author not Present'});
    }
})

module.exports = router;