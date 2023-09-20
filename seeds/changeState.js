/*
Pages-

Team details, please wait. - state = “not-started”
2. All teams created. Show industry, vps. - state = “started”
3. Cities Page. - state = “cities”
4. Sectors. - state = “sectors”, “”
5. If hasSubmitted == true and state = “sectors” then show pls wait page 
6. Show investors details - if state = "investors"  and hasSumitted == true
7. Show investment details - state = "investmentInfo"
 8. Round 2 completed page - state = "end"


POST /setState/
{currentState:”started”}. (eg.)
*/
const Team = require('../models/teamModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { errorCodes } = require('../utils/constants');
const changeState = catchAsync(async (req, res, next) => {
    const team = await Team.find({});
    const nextState = req.body.nextState;
    console.log(team[0].currentRound);
    team.forEach(async function (team) {
        await Team.findOneAndUpdate({ "_id": team._id },
            {
                $set: {
                    "currentRound": nextState
                }
            });
    })
    res.status(200).json(
        "success"
    )
});
module.exports = changeState;