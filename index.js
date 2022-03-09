//============
//BASIC CONFIG
//============
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt')
const app = express();
const bodyParser = require('body-parser')
const requireAuth = require('./middleware/userAuth')
require('./db/connection');
const PORT = process.env.PORT
app.set('port', process.env.PORT || 8000);

//==========
//MIDDLEWARE
//==========
//not sure if i should use bodyParser or express.json try with both
// app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//===========
//CONTROLLERS
//===========


// const userController = require('./controllers/userController');
// app.use(userController);

//===========
//ROUTES
//===========
app.get('/', (req, res) => {
    res.send(`your email: ${req.user.email}`)
})


//============
//START SERVER
//============
app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500; 
    const message = err.message || "Internal Server Error";
    res.status(statusCode).send(message);
});

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🐲 🌟`);
});
