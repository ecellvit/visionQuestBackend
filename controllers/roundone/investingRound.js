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
  const email = "fgdf@dsg.com";
  const team = await Team.findOne({ LeaderEmail: email });
  const industryName = team.industry;
  const sectorVals = sectors[team.industryIdx];
  const sector = sectorName[industryName];
  console.log(sectorVals);
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
  const email = "fgdf@dsg.com";
  const team = await Team.findOne({ LeaderEmail: email });
  const teamCityIdx = team.cityIdx;
  const teamIndustry = team.industry;
  const teamIndustryIdx = team.industryIdx;
  const sectorArr = sectorName[teamIndustry];
  const investedAmt = req.body;
  let roiVal = 0;
  let totalInvested = investedAmt.reduce(function (a, b) {
    return a + b;
  });
  if (totalInvested < team.vps) {
    const updatedAmt = team.vps - totalInvested;
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
    await Team.findOneAndUpdate({ LeaderEmail: email }, {
      $set: {
        vps: updatedAmt
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

// exports.roundOneEnd(catchAsync(async (req, res, next) => {
  
// }))