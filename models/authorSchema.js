const mongoose = require('mongoose');

module.exports = mongoose.model('author',{
    Name: {type : String},
    PhNo: {type : String},
    email: {type : String}
});