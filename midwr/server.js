//imports
const express = require('express');
const cors = require('cors');
// const app = require('./backend/app');
const dotenv = require('dotenv');
const debug = require('debug')("node-angular");
const db = require('./db/connect');
const bodyParse = require('body-parser');
// const r_hub = require('./backend/routes/routeHub');
//SWAGGER
// const swaggerUi = require('swagger-ui-express');
// const swagDoc = require('./swagger.json');


//security
// const { doubleCsrf } = require("csrf-csrf");



const app = express();
dotenv.config();
const port = process.env.PORT || 3000;


app
//   .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagDoc))
  .use(cors())
  .use(bodyParse.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
//   .use('/', r_hub);

// const server = http.createServer(app);

const start = async () => {
    const connected = await db.connect();    
    app.listen(port, () => {
        if (connected) {
            console.log(`Running on port ${port}`);
        } else {
            console.log(`error - not connected`);
        }
    })
}
start();

