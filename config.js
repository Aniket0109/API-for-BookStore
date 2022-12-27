const config = {
    port : process.env.PORT||3000,
    mongodb : "mongodb://127.0.0.1/petPerfect",
    mongodbOptions : {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
}

module.exports = config;