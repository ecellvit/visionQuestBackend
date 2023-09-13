const Team = require('../../models/teamModel')
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { errorCodes, objectIdLength } = require("../../utils/constants");

exports.startRoundOne = catchAsync(async (req, res, next) => {
  if (req.params.teamId.length !== objectIdLength) {
    return next(
      new AppError("Invalid TeamId", 412, errorCodes.INVALID_TEAM_ID)
    );
  }

  const team = await Team.findOne({ _id: req.params.teamId });

  if (!team) {
    return next(
      new AppError("Invalid TeamId", 412, errorCodes.INVALID_TEAM_ID)
    );
  }

  if (team.teamLeaderId.toString() !== req.user._id) {
    return next(
      new AppError(
        "User doesn't belong to the Team or User isn't a Leader",
        412,
        errorCodes.INVALID_USERID_FOR_TEAMID_OR_USER_NOT_LEADER
      )
    );
  }

  if (!team.isTeamQualified) {
    return next(
      new AppError("Team is not qualified", 412, errorCodes.TEAM_NOT_QUALIFIED)
    );
  }

  if (team.hasRoundOneEnd) {
    return next(
      new AppError("Round 1 Completed", 412, errorCodes.ROUND_ONE_COMPLETED)
    );
  }
  if (team.hasRoundOneStarted) {

  }
});
