const Team = require('../../models/teamModel')
const catchAsync = require("../../utils/catchAsync");
const User = require('../../models/user');
const sectors = require('../../card_values.json');
const sectorName = require('../../industry_sectors.json');
const roiJson = require('../../ROI.json');


exports.qualification=catchAsync(async(req,res,next)=>{
    const team=await Team.find({}).sort({vps:-1});
    res.status(200).json({
        team
    })
})