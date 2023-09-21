const Team = require('../models/teamModel');
const catchAsync = require('../utils/catchAsync');

exports.getVps = catchAsync(async (req, res) => {
    const team = await Team.find({}).sort({ vps: -1 });
    const result = {};
    team.forEach((t) => {
        if (t.isQualified) {
            const industryName = t.industry;

            if (!result[industryName]) {
                result[industryName] = [];
            }

            result[industryName].push({
                teamName: t.teamName,
                valuation: t.valuation
            });
        }
    });

    res.status(200).json(result)
})