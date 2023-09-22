const express = require('express');

const path = require('path');
const teamRoute = require('./routes/team');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
//const adminRoute1=require('./routes/admin1')
const round1Route = require('./routes/roundone');
const round2Route = require('./routes/roundtwo');
const Team = require('./models/teamModel');
const scoreRoute = require('./routes/scores')
const app = express();
// const catchAsync = require('./utils/catchAsync');
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

morgan.token("req-headers", function (req, res) {
    return JSON.stringify(req.headers);
});

process.env.NODE_ENV != "production" &&
    app.use(morgan(":method :url :status :req-headers"));
app.use(express.urlencoded({ extended: true }));

app.use('loaderio-44aafbd7e8ac247fab8aba002ad3a452/api/team', teamRoute);
app.use('loaderio-44aafbd7e8ac247fab8aba002ad3a452/api/auth', authRoute);
app.use('loaderio-44aafbd7e8ac247fab8aba002ad3a452/api/admin', adminRoute);
app.use('loaderio-44aafbd7e8ac247fab8aba002ad3a452/api/roundOne', round1Route);
app.use('loaderio-44aafbd7e8ac247fab8aba002ad3a452/api/getVps', scoreRoute);
app.use('loaderio-44aafbd7e8ac247fab8aba002ad3a452/api/roundTwo', round2Route);
//app.use('/api/admin1',adminRoute1);
module.exports = app;