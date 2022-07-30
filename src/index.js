const express = require('express');

const loginController = require('./controller/login.controller');
const signupController = require('./controller/signup.controller');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});


app.use('/login', loginController);
app.use('/signup', signupController);

module.exports = app;