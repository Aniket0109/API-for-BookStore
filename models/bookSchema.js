const mongoose = require('mongoose');

module.exports = mongoose.model('books',{
    title: {type : String},
    likes: {type : Number},
    author: {type : mongoose.Schema.Types.ObjectId, ref : 'author'}
});