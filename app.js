// Import express
const express = require('express');

const userRouter = require('./routes/userRoutes')
const poiRouter = require('./routes/poiRoutes')

// Create app variable
const app = express();

app.use(express.json());

app.use('/smartTourism/api/users', userRouter);
app.use('/smartTourism/api/pois', poiRouter);


// Export app to use it in the server.js file
module.exports = app;