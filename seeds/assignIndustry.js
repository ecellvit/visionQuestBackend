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
            'Healthcare',
            'Finance',
        ];
        const teams = await Team.find({}).sort({ teamNumber: 1 });
        if (!teams) {
            return next(
                res.status(401).json({ "message": "Something Went Wrong" })
            )
        }
        // if (teams[0].industry) {
        //     return next(
        //         res.status(400).json({ "message": "Industry Already Assigned" })
        //     )
        // }
        console.log(teams);
        teams.forEach(async function (team) {
            if (team.teamNumber > 0 && team.teamNumber <= 10) {
                await Team.findOneAndUpdate({ "_id": team._id },
                    {
                        $set: {
                            "industry": industries[0],
                            "industryIdx": 0
                        }
                    });
            }
            if (team.teamNumber > 10 && team.teamNumber <= 20) {
                await Team.findOneAndUpdate({ "_id": team._id },
                    {
                        $set: {
                            "industry": industries[1],
                            "industryIdx": 1
                        }
                    });
            }
            if (team.teamNumber > 20 && team.teamNumber <= 30) {
                await Team.findOneAndUpdate({ "_id": team._id },
                    {
                        $set: {
                            "industry": industries[2],
                            "industryIdx": 2
                        }
                    });
            }
            if (team.teamNumber > 30 && team.teamNumber <= 40) {
                await Team.findOneAndUpdate({ "_id": team._id },
                    {
                        $set: {
                            "industry": industries[3],
                            "industryIdx": 3
                        }
                    });
            }
            if (team.teamNumber > 40 && team.teamNumber <= 50) {
                await Team.findOneAndUpdate({ "_id": team._id },
                    {
                        $set: {
                            "industry": industries[4],
                            "industryIdx": 4
                        }
                    });
            }

        })

        teams.forEach(async function (team) {
            await Team.findOneAndUpdate({ "_id": team._id },
                {
                    $set: {
                        'currentRound': "started"
                    }
                });
        });
        console.log('Industries assigned to teams successfully.');
        res.status(200).json("success");
    } catch (error) {
        console.error('Error assigning industries:', error);
    }
});
module.exports = assignIndustriesToTeams;





// const maxTeamsPerIndustry = teams.length / 5;
//         // Shuffle the list of teams randomly
//         const shuffledTeams = [...teams].sort();
//         const industryCounts = {};
//         const updatedTeams = [];
//         for (const team of shuffledTeams) {
//             const randomIndustry = industries.find((industry) => {
//                 if (!industryCounts[industry] || industryCounts[industry] < maxTeamsPerIndustry) {
//                     industryCounts[industry] = (industryCounts[industry] || 0) + 1;
//                     return true;
//                 }
//                 return false;
//             });

//             if (!randomIndustry) {
//                 // No available industry found for this team
//                 console.log(`No available industry found for team ${team.name}`);
//                 continue;
//             }

//             team.industry = randomIndustry;
//             team.industryIdx = industries.indexOf(randomIndustry);
//             updatedTeams.push(team);
//         }

//         // Update teams with their assigned industries
//         for (const updatedTeam of updatedTeams) {
//             await updatedTeam.save();
//         }