const Team = require('../../models/teamModel');
const { db } = require('../../models/user');
const catchAsync = require('../../utils/catchAsync');
const { teamValidation } = require('../../schemas');
const AppError = require('../../utils/appError');
const { errorCodes } = require('../../utils/constants');
const User = require('../../models/user');
const { generateTeamToken } = require("./utils");

exports.getTeam = async (req, res, next) => {
    // console.log("User ID: " + req.user._id);
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(
            new AppError("User Not Found", 400, errorCodes.INVALID_USERID_FOR_TEAMID)
        );
    }
    const email = user.email;
    console.log(user);
    const team = await Team.findOne({ leaderEmail: email });
    if (!team) {
        return next(
            new AppError("Team Not Found", 400, errorCodes.INVALID_TEAM_ID)
        );
    }
    res.json({
        team
    })
}

exports.makeTeam = catchAsync(async (req, res, next) => {
    const { error } = teamValidation(req.body);
    if (error) {
        return next(
            new AppError(
                error.details[0].message,
                400,
                errorCodes.INPUT_PARAMS_INVALID
            )
        );
    }

    //check whether teamname already taken
    const team_by_name = await Team.findOne({ teamName: req.body.teamName });
    if (team_by_name) {
        return next(
            new AppError("TeamName Already Exists", 412, errorCodes.TEAM_NAME_EXISTS)
        );
    }
    const team_by_number = await Team.findOne({ teamNumber: req.body.teamNumber });
    if (team_by_number) {
        return next(
            new AppError("TeamNumber Already Exists", 412, errorCodes.TEAM_NUMBER_EXISTS)
        );
    };

    const newTeam = await new Team({
        teamName: req.body.teamName,
        teamNumber: req.body.teamNumber,
        leaderName: req.body.leaderName,
        leaderEmail: req.body.leaderEmail,
        vps: 15000,
        hasRoundOneStarted: false,
        hasRoundOneEnded: false,
        hasRoundTwoStarted: false,
        hasRoundTwoEnded: false,
        hasRoundThreeStarted: false,
        hasRoundThreeEnded: false,
        isQualified: true,
        currentRound: "Not Started"
    }).save();
    console.log(req.body);
    res.status(201).json({
        message: "New Team Created Successfully",
        teamId: newTeam._id,
    });
});
