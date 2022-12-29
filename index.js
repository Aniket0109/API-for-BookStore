const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(bodyParser.json());

mongoose.set('strictQuery', false);
mongoose.connect(config.mongodb, config.mongodbOptions);
const db = mongoose.connection;

// On Successfull connection
db.once('open',()=> console.log("Connected to DB"));

// In case of error
db.on('error', (err) => console.log(err));

app.use('/', routes);

app.listen(config.port, () =>console.log(`Server running on ${config.port}`));