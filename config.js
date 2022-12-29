const config = {
    port : process.env.PORT||3000,
    mongodb : "mongodb://127.0.0.1/petPerfect",
    mongodbOptions : {
        useNewUrlParser : true,
        useUnifiedTopology : true
    },
    jwt_secret_key : "AniketKumar" // Can also be stored in .env
}

module.exports = config;