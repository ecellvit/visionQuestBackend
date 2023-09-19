const Team = require('../../models/teamModel')
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { errorCodes, objectIdLength } = require("../../utils/constants");
const User = require('../../models/user');
const sectors = require('../../card_values.json');
const sectorName = require('../../industry_sectors.json');
const roiJson = require('../../ROI.json');

exports.getCards = catchAsync(async (req, res, next) => {
  //we need to send the sectors, city, industry name, minimum amt
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(
      new AppError("User Not Found", 400, errorCodes.INVALID_USERID_FOR_TEAMID)
    );
  }
  const email = user.email;
  const team = await Team.findOne({ leaderEmail: email });
  if (!team) {
    return next(
      new AppError("Team Not Found", 412, errorCodes.INVALID_TEAM_ID)
    )
  }
  const industryName = team.industry;
  const sectorVals = sectors[team.industryIdx];
  const sector = sectorName[industryName];
  console.log(sectorVals);
  console.log(industryName);
  console.log(sector);
  let minVal = {};
  if (sector.length === sectorVals.length) {
    for (let i = 0; i < sector.length; i++) {
      minVal[sector[i]] = sectorVals[i];
    }
  }
  console.log(minVal);
  const city = team.city;
  res.status(200).json({
    industryName,
    city,
    minVal
  })
});

exports.postInvestment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(
      new AppError("User Not Found", 400, errorCodes.INVALID_USERID_FOR_TEAMID)
    );
  }
  const email = user.email;
  const team = await Team.findOne({ leaderEmail: email });
  if (!team) {
    return next(
      new AppError("Team Not Found", 412, errorCodes.INVALID_TEAM_ID)
    )
  }
  const teamCityIdx = team.cityIdx;
  const teamIndustry = team.industry;
  const teamIndustryIdx = team.industryIdx;
  const sectorArr = sectorName[teamIndustry];
  const sectorVals = sectors[team.industryIdx];
  const investedAmt = req.body;
  let roiVal = 0;
  for (let i = 0; i < investedAmt.length; i++) {
    if (investedAmt[i] != 0 && !(investedAmt[i] >= sectorVals[i])) {
      return next(
        new AppError("Enter the base Fare at least or 0", 412, errorCodes.INVALID_INVESTMENT)
      );
    }
  }
  let totalInvested = investedAmt.reduce(function (a, b) {
    return a + b;
  });
  if (totalInvested < team.vps) {
    if (investedAmt.length === sectorArr.length) {
      for (let i = 0; i < investedAmt.length; i++) {
        console.log("sector: " + sectorArr[i]);
        console.log("return: " + roiJson[i][teamCityIdx] + "%");
        console.log("Amt investing in this sector: " + investedAmt[i]);
        roiVal += ((roiJson[i][teamCityIdx]) * (investedAmt[i])) / 100;
      }
    }
    else {
      return next(
        new AppError("Something Went Wrong", 412, errorCodes.UNKNOWN_ERROR)
      );
    }
    let updatedAmt = team.vps - totalInvested + roiVal;
    let valuation = updatedAmt * 100;
    await Team.findOneAndUpdate({ leaderEmail: email }, {
      $set: {
        vps: updatedAmt,
        roiVal: roiVal,
        valuation: valuation
      }
    });
    console.log(roiVal);
    res.status(200).json({
      teamIndustryIdx,
      totalInvested,
      roiVal
    })
  }
  if (totalInvested === 0) {
    return next(
      new AppError("You must Invest in atleast one of the Sectors", 412, errorCodes.INVALID_INVESTMENT)
    );
  }
  if (totalInvested > team.vps) {
    return next(
      new AppError("Invested amount more than VPS", 412, errorCodes.INVALID_INVESTMENT)
    );
  }
});