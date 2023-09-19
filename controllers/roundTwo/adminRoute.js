const Team = require('../../models/teamModel');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

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
                    'hasRoundTwoStarted': false,
                    'hasRoundTwoEnded': true,
                    'currentRound': "Round 2 ended"
                }
            });
    });
    const industries = [
        'IT',
        'Fashion',
        'Petrochemical',
        'Automobile',
        'Healthcare',
        'Finance',
    ];
    for (let i = 0; i < industries.length; i++) {
        let teamsDq = await Team.find({ industry: industries[i] }).sort({ vps: 1 }).limit(3);
        teamsDq.forEach(async function (team) {
            await Team.findOneAndUpdate({ "_id": team._id }, { $set: { 'isQualified': false } });
        });
    }

    res.json("Round 2 ended");
})

exports.hasStarted = catchAsync(async (req, res, next) => {
    const teams = await Team.find({ 'isQualified': true });
    teams.forEach(async function (team) {
        await Team.findOneAndUpdate({ "_id": team._id }, { $set: { 'hasRoundTwoStarted': true, 'hasRoundTwoEnded': false, 'currentRound': "Round 2" } })
    });
    res.json("Round2 started");
})