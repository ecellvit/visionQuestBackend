const mongoose = require('mongoose');
const teamSchema = mongoose.Schema(
    {
        teamName: {
            type: String,
            unique: true
        },
        teamLeaderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        teamNumber: {
            type: Number
        },
        leaderName: {
            type: String
        },
        leaderEmail: {
            type: String
        },
        teamID: {
            type: mongoose.Schema.Types.ObjectId
        },
        vps: {
            type: Number
        },
        industry: {
            type: String
        },
        industryIdx: {
            type: Number
        },
        roiVal: {
            type: Number
        },
        valuation: {
            type: Number
        },
        city: {
            type: String
        },
        cityIdx: {
            type: Number
        },
        isQualified: {
            type: Boolean
        },
        hasSubmittedSectors: {
            type: Boolean
        },
        currentRound: {
            type: String
        }
    },
    { collection: "TeamModel" }
);

module.exports = mongoose.model("TeamModel", teamSchema);
