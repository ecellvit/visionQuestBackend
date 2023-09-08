const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const teamRoute = require('./routes/team');
const quizRoute = require('./routes/answers')
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const Quiz = require('./models/quizques');
mongoose.connect('mongodb+srv://aryan242003:Aryankr2411_@cluster0.7hl6laz.mongodb.net/', {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Connected");
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/makeTeam', teamRoute);
app.use('/quiz', quizRoute);

app.get('/getScores', (req, res) => {
    res.render('scores');
})

app.listen(3000, () => {
    console.log("Listening on Port 3000");
})