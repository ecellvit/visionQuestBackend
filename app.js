const express = require('express');
const app = express();
const path = require('path');
const teamRoute = require('./routes/team');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const round1Route = require('./routes/roundone');
const Team = require('./models/teamModel');
// const catchAsync = require('./utils/catchAsync');
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
app.use(bodyParser.urlencoded({
    extended: true
}));
process.env.STATUS != "production" &&
    app.use(morgan(":method :url :status :req-headers"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/api', (req, res) => {
    res.render('frontpage');
})

app.use('/api/makeTeam', teamRoute);
app.use('/api/auth', authRoute);
app.use('/admin/round1', adminRoute);
app.use('/api/roundOne', round1Route);

module.exports = app;