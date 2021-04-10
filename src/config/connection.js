const mongoose = require('mongoose');

class Connection {

    constructor(){
        this.databaseConnectionMongoDB();
    }
    
    databaseConnectionMongoDB(){
        this.mongoDBConnection = mongoose.
        connect('mongodb+srv://codesete:YsQmnqYQABIpEr4l@codesete.mhhld.mongodb.net/codesete?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log('Conexão Estabelecida com o mongoDB');
        }).catch(err =>{
            console.log(`Erro ao se conectar ao MongoDB: ${err}`);
        })
    }
}

module.exports = new Connection();