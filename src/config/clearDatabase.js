const mongoose = require('mongoose');
const connectDB = require('./db');


const clearDatabase = async () => {
    try {
        // Conectar ao banco de dados
        await connectDB();

        // Obter a conexão do mongoose
        const db = mongoose.connection.db;

        // Dropar o banco de dados
        await db.dropDatabase();

        console.log('Banco de dados limpo com sucesso!');
    } catch (error) {
        console.error('Erro ao limpar o banco de dados', error);
    } finally {
        
        mongoose.connection.close();
    }
};

clearDatabase();
