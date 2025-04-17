import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ATP APIs Documentation',
      version: '1.0.0',
      description: 'API documentation for Authentication APIs',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://atp-apis.onrender.com'
          : `http://localhost:${process.env.PORT}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
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
  apis: ['./src/**/*.docs.ts'], // Path to your API routes
};

export const specs = swaggerJsdoc(options);