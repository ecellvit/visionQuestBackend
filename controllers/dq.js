const Team = require('../models/teamModel');
const catchAsync = require('../utils/catchAsync');

exports.disQualify = catchAsync(async (req, res, next) => {
    const industries = [
        'IT',
        'Healthcare',
        'Fashion',
        'Petrochemical',
        'Finance',
    ];
    for (let i = 0; i < industries.length; i++) {
        const teams = await Team.find({ industry: industries[i] }).sort({ vps: 1 }).limit(5);
        teams.forEach(async (t) => {
            await Team.findOneAndUpdate({ _id: t._id }, { $set: { isQualified: false } });
        })
    }
    res.status(200).json("Success");
});