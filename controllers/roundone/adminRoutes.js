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
            new AppError("Team Not Found", 412, errorCodes.INVALID_TEAM_NAME)
        );
    }
    if (!team.isQualified) {
        return next(
            new AppError("Team Not Qualified", 412, errorCodes.TEAM_NOT_QUALIFIED)
        );
    }
    if ((!(amt < team.vps) || !(amt > 0))) {
        return next(
            new AppError("The amount entered is INVALID", 412, errorCodes.AMOUNT_EXCEEDED)
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
            new AppError("City Not Found", 412, errorCodes.CITY_NOT_FOUND)
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
            new AppError("Something Went Wrong", 400, errorCodes.EXCEPTION)
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