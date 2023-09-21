const Team = require('../../models/teamModel')
const catchAsync = require("../../utils/catchAsync");
const User = require('../../models/user');
const sectors = require('../../card_values.json');
const sectorName = require('../../industry_sectors.json');
const roiJson = require('../../ROI.json');

exports.getCards = catchAsync(async (req, res, next) => {
  //we need to send the sectors, city, industry name, minimum amt
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(
      res.status(401).json({ "message": "User Not Found" })
    );
  }
  const email = user.email;
  const team = await Team.findOne({ leaderEmail: email });
  if (!team) {
    return next(
      res.status(401).json({ "message": "Team Not Found" })
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
      res.status(401).json({ "message": "User Not Found" })
    );
  }
  const email = user.email;
  const team = await Team.findOne({ leaderEmail: email });
  if (!team) {
    return next(
      res.status(401).json({ "message": "Team Not Found" })
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
    if (investedAmt[i] < 200) {
      return next(
        res.status(412).json({ "message": "The invested amount must be more than 200" })
      )
    }
  }
  let totalInvested = investedAmt.reduce(function (a, b) {
    return a + b;
  });
  if (totalInvested <= team.vps) {
    if (investedAmt.length === sectorArr.length) {
      for (let i = 0; i < investedAmt.length; i++) {
        console.log("sector: " + sectorArr[i]);
        console.log("return: " + roiJson[i][teamCityIdx] + "%");
        console.log("Amt investing in this sector: " + investedAmt[i]);
        roiVal += Math.round(((roiJson[i][teamCityIdx]) * (investedAmt[i])) / 100);
      }
    }
    else {
      if (!team) {
        return next(
          res.status(412).json({ "message": "Team Not Found" })
        )
      };
    }
    let vpsAfterInvesting = team.vps - totalInvested;
    let updatedAmt = vpsAfterInvesting + roiVal + totalInvested;
    let valuation = updatedAmt * 100;
    await Team.findOneAndUpdate({ leaderEmail: email }, {
      $set: {
        vps: updatedAmt,
        roiVal: roiVal,
        valuation: valuation,
        hasSubmittedSectors: true
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
      res.status(412).json({ "message": "You must Invest in atleast one of the Sectors" })
    );
  }
  if (totalInvested > team.vps) {
    return next(
      res.status(412).json({ "message": "Invested amount more than VPS" })
    )
  }
});