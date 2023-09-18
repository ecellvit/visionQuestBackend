const express = require('express');

const path = require('path');
const teamRoute = require('./routes/team');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const round1Route = require('./routes/roundone');
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

app.use('/api/makeTeam', teamRoute);
app.use('/api/auth', authRoute);
app.use('/admin/round1', adminRoute);
app.use('/api/roundOne', round1Route);
app.use('/api/getVps', scoreRoute);

module.exports = app;