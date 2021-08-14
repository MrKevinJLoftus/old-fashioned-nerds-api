const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

app.use(helmet.hsts());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/", express.static(path.join(__dirname, "ui")));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use((req, res, next) => {
    console.log('sending index.html');
    res.sendFile(path.join(__dirname, "ui", "index.html"));
});

// Custom error handler
app.use(function(err, req, res, next) {
    // Any request to this server will get here, and will send an HTTP
    // response with the error message provided
    console.log(err);
    res.status(500).json({ message: err.message });
});
  
module.exports = app;