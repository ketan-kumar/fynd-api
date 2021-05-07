// Loading gloal env file
require('dotenv').config({path: '.env'});
    
// Express
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

// Routes
const routes = require('./lib/routes/index');
const userRoutes = require('./lib/routes/user');

app.use('/user', userRoutes);
app.use('/', routes);

app.listen(process.env.PORT,  () => {
    console.log(`Fynd started listening at http://localhost:${process.env.PORT}`)
});

//connect to mongoose
mongoose.connect('mongodb+srv://007ketan:root@123@cluster0.425rv.mongodb.net/fynd?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Fynd connected to db');
}).catch(error => {
  console.log(error, 'error');
});

module.exports = app;
