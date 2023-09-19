const Team = require('../models/teamModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { errorCodes } = require('../utils/constants');
const assignIndustriesToTeams = catchAsync(async (req, res, next) => {
    try {
        const industries = [
            'IT',
            'Fashion',
            'Petrochemical',
            'Automobile',
            'Healthcare',
            'Finance',
        ];
        const teams = await Team.find({});
        if (teams[0].industry) {
            return next(
                new AppError("Industry Already Assigned", 400, errorCodes.INDUSTRY_ALREADY_ASSIGNED)
            )
        }
        const maxTeamsPerIndustry = teams.length / 6;
        // Shuffle the list of teams randomly
        const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
        const industryCounts = {};
        const updatedTeams = [];
        for (const team of shuffledTeams) {
            const randomIndustry = industries.find((industry) => {
                if (!industryCounts[industry] || industryCounts[industry] < maxTeamsPerIndustry) {
                    industryCounts[industry] = (industryCounts[industry] || 0) + 1;
                    return true;
                }
                return false;
            });

            if (!randomIndustry) {
                // No available industry found for this team
                console.log(`No available industry found for team ${team.name}`);
                continue;
            }

            team.industry = randomIndustry;
            team.industryIdx = industries.indexOf(randomIndustry);
            updatedTeams.push(team);
        }

        // Update teams with their assigned industries
        for (const updatedTeam of updatedTeams) {
            await updatedTeam.save();
        }

        console.log('Industries assigned to teams successfully.');
        res.status(200).json("success");
    } catch (error) {
        console.error('Error assigning industries:', error);
    }
});
module.exports = assignIndustriesToTeams;