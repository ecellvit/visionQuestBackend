const Team = require('../../models/teamModel');
const catchAsync = require('../../utils/catchAsync');
const cityJson = require('../../cities.json');
const AppError = require('../../utils/appError');
const { errorCodes } = require('../../utils/constants')

exports.getCity = (req, res) => {
    res.render('adminr1');
}
exports.assignCity = catchAsync(async (req, res, next) => {
    const { teamname, amt, city } = req.body;
    const team = await Team.findOne({ teamname: teamname });
    if (!team) {
        return next(
            new AppError("Team Not Found", 412, errorCodes.INVALID_TEAM_NAME)
        );
    }
    if (!(amt < team.vps)) {
        return next(
            new AppError("The amount entered is More than the Vps Available", 412, errorCodes.AMOUNT_EXCEEDED)
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