import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import routes from './routes/index.js';
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

/**
    * Connect to the database
    */

mongoose.connect('mongodb://localhost/product-db'); 
 
/**
    * Middleware
    */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});

/**
    * Register the routes
    */

routes(app);

export default app;
