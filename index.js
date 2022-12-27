const express = require('express');
const mongoose = require('mongoose');

const authorSchema = require('./models/author');
const bookSchema = require('./models/books');

const config = require('./config');
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(config.mongodb, config.mongodbOptions);
const db = mongoose.connection;

// On Successfull connection
db.once('open',()=> console.log("Connected to DB"));

// In case of error
db.on('error', (err) => console.log(err));

app.get('/', (req, res) => res.send("Welcome to Microservice API"));

app.listen(config.port, () =>console.log(`Server running on ${config.port}`));