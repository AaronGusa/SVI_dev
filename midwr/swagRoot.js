const swagGen = require('swagger-autogen');

const swagDoc = {
    info: {
        title: "Stella Vi",
        description: "MidWare & Backend",
    },
    // host: 'stellavibe.onrender.com',
    // schemes: ['https'],
    host: 'localhost:3000',
    schemes: ['http'],
    //# Step 1 - define the security scheme
    // securityDefinitions: {
    //     oAuthSample: {
    //       type: 'oauth2',
    //       authorizationUrl: 'https://dev-yiwo0izzbi3gaip8.us.auth0.com',
    //       flow: 'implicit',
    //       scopes: {}
    //     }
    //   }
};


const outputFile = './swagger.json';
const routerFile = ['./routes/routeHub.js'];

swagGen(outputFile, routerFile, swagDoc);