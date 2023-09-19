const Team = require('../models/teamModel');
const catchAsync = require('../utils/catchAsync');

exports.getVps = catchAsync(async (req, res) => {
    const team = await Team.find({}).sort({ vps: -1 });
    team.forEach((t) => {
        if (t.isQualified) {
            result[t.teamName] = t.vps
        }
    });
    res.status(200).json(result)
})