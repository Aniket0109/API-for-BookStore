const mongoose = require('mongoose');

module.exports = mongoose.model('author',{
    Name: {type : String},
    PhNo: {type : Number},
    email: {type : mongoose.Schema.Types.Mixed}
});