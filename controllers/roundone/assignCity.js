const Team = require('../../models/teamModel');
const catchAsync = require('../../utils/catchAsync');

exports.assignCity = catchAsync(async (req, res, next) => {
    const { teamname, amt, city } = req.body;
    const team = await Team.findOne({ teamname: teamname });
    const teamvps = team.vps - amt;
    await Team.findOneAndUpdate({ teamname: teamname }, {
        $set: {
            city: city,
            vps: teamvps
        }
    });
    console.log("updated city and vps");
    res.status(200).json('successful');
});