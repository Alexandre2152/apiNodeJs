const mongoose = require('mongoose')

//Ciando uma conexão com o mongo
mongoose.connect('mongodb://localhost/noderest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
mongoose.Promise = global.Promise;

module.exports = mongoose;