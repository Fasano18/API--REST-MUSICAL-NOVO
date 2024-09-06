// swaggerOptions.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca Musical API',
      version: '1.0.0',
      description: 'API para gerenciar usuários e músicas.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Arquivos onde suas rotas estão definidas
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
