import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ATP APIs Documentation',
      version: '1.0.0',
      description: 'API documentation for Authentication APIs',
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken'
        }
      }
    },
    security: [{
      cookieAuth: []
    }]
  },
  apis: ['./src/**/*.ts'], // Path to your API routes
};

export const specs = swaggerJsdoc(options);