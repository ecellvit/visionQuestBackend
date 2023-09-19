const Team = require('../models/teamModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { errorCodes } = require('../utils/constants');

exports.hasRoundOneStarted = (catchAsync(async (req, res, next) => {
    const team = await Team.find({});
    if (!(team[0].hasRoundOneStarted)) {
        return next(
            new AppError("Round One has not Started", 412, errorCodes.ROUND_ONE_NOT_STARTED)
        );
    }
    next();
}));
exports.hasRoundOneEnded = (catchAsync(async (req, res, next) => {
    const team = await Team.find({});
    if (!(team[0].hasRoundOneEnded)) {
        return next(
            new AppError("Round One has not Ended Yet", 412, errorCodes.ROUND_ONE_NOT_ENDED)
        );
    }
    next();
}));

exports.hasRoundTwoStarted = (catchAsync(async (req, res, next) => {
    const team = await Team.find({});
    if (!(team[0].hasRoundTwoStarted)) {
        return next(
            new AppError("Round Two has not Started", 412, errorCodes.ROUND_TWO_NOT_STARTED)
        );
    }
    next();
}));