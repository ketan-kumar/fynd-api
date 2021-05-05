// Loading gloal env file
require('dotenv').config({path: '.env'});
    
// Express
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

// Routes
const routes = require('./lib/routes/index');
const userRoutes = require('./lib/routes/user');
app.use('/user', userRoutes);
app.use('/', routes);

app.listen(process.env.PORT);

module.exports = app;
