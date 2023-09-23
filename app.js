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
const scoreRoute = require('./routes/scores');
const catchAsync = require('./utils/catchAsync');
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

app.use('/api/team', teamRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/roundOne', round1Route);
app.use('/api/getVps', scoreRoute);
app.use('/api/roundTwo', round2Route);

app.get('/api/admin/assignNumbers', catchAsync(async (req, res) => {
    const numbers = Array.from({ length: 50 }, (_, i) => i + 1); // Create an array of numbers from 1 to 60
    const result = [];
    let i = 0;
    while (numbers.length > 0 && result.length < 50) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const randomNum = numbers[randomIndex];

        result.push(randomNum);
        numbers.splice(randomIndex, 1); // Remove the selected number from the array
    }

    console.log(result);
    const teams = await Team.find({});
    teams.forEach(async (t) => {
        await Team.findOneAndUpdate({ _id: t._id }, { $set: { teamNumber: result[i++] } });
    })
    res.json('success');
}))
app.get('/api/admin/getTop3', catchAsync(async (req, res) => {
    const team = await Team.find({}).sort({ vps: -1 }).limit(5);
    res.status(200).json(team)
}))
//app.use('/api/admin1',adminRoute1);
module.exports = app;