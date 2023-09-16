const Team = require('../models/teamModel');
const catchAsync = require('../utils/catchAsync');

exports.getVps = catchAsync(async (req, res) => {
    const team = await Team.find({}).sort({ vps: -1 });
    // console.log(team);
    res.status(200).json({
        team
    })
})