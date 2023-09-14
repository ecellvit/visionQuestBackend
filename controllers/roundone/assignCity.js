const Team = require('../../models/teamModel');
const catchAsync = require('../../utils/catchAsync');
const cityJson = require('../../cities.json');
exports.getCity = (req, res) => {
    res.render('adminr1');
}
exports.assignCity = catchAsync(async (req, res, next) => {
    const { teamname, amt, city } = req.body;
    const team = await Team.findOne({ teamname: teamname });
    const teamvps = team.vps - amt;
    const industr = team.industry;
    let cityIdx = 0;
    for (let i = 0; i < cityJson[industr].length; i++) {
        console.log(cityJson[industr][i]);
        if (cityJson[industr][i].toLowerCase() === city.toLowerCase()) {
            cityIdx = i;
            break;
        }
    }
    await Team.findOneAndUpdate({ teamname: teamname }, {
        $set: {
            city: city,
            vps: teamvps,
            cityIdx: cityIdx
        }
    });
    console.log("updated city and vps");
    res.status(200).json('successful');
});