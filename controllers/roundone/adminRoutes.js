const Team = require('../../models/teamModel');
const catchAsync = require('../../utils/catchAsync');
const cityJson = require('../../cities.json');
const AppError = require('../../utils/appError');
const { errorCodes } = require('../../utils/constants');
exports.getCity = (req, res) => {
    res.status(201).json("Team Assign Form");
}
exports.assignCity = catchAsync(async (req, res, next) => {
    const { teamName, amt, city } = req.body;
    const team = await Team.findOne({ teamName: teamName });
    if (!team) {
        return next(
            res.status(401).json({ "message": "Something Went Wrong" })
        )
    }
    if (!team.isQualified) {
        return next(
            res.status(400).json({ "message": "Team Not Qualified" })
        );
    }
    if ((!(amt < team.vps) || !(amt > 0))) {
        return next(
            res.status(400).json({ "message": "The amount entered is INVALID" })
        );
    }
    const teamvps = team.vps - amt;
    const industr = team.industry;
    let cityIdx = -1;
    for (let i = 0; i < cityJson[industr].length; i++) {
        console.log(cityJson[industr][i]);
        if (cityJson[industr][i].toLowerCase() === city.toLowerCase()) {
            cityIdx = i;
            break;
        }
    }
    if (cityIdx === -1) {
        return next(
            res.status(400).json("City Not Found!")
        );
    }
    await Team.findOneAndUpdate({ teamName: teamName }, {
        $set: {
            city: city,
            vps: teamvps,
            cityIdx: cityIdx
        }
    });
    console.log("updated city and vps");
    res.status(200).json('successful');
});


exports.hasEnded = catchAsync(async (req, res, next) => {
    let teams = await Team.find({}).sort({ vps: -1 });
    if (!teams) {
        return next(
            res.status(400).json({ "message": "Something Went Wrong" })
        )
    }
    teams.forEach(async function (team) {
        await Team.findOneAndUpdate({ "_id": team._id },
            {
                $set: {
                    'hasRoundOneStarted': false,
                    'hasRoundOneEnded': true,
                    'currentRound': "Round 1 ended"
                }
            });
    });
    let teamsDq = await Team.find({}).sort({ vps: 1 }).limit(20);
    teamsDq.forEach(async function (team) {
        await Team.findOneAndUpdate({ "_id": team._id }, { $set: { 'isQualified': false } });
    });
    res.json("Round1 ended");
})

exports.hasStarted = catchAsync(async (req, res, next) => {
    const teams = await Team.find({});
    teams.forEach(async function (team) {
        await Team.findOneAndUpdate({ "_id": team._id }, { $set: { 'hasRoundOneStarted': true, 'hasRoundOneEnded': false, 'currentRound': "Round 1" } })
    });
    res.json("Round1 started");
})