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
        hasRoundOneStarted: {
            type: Boolean,
        },
        hasRoundOneEnded: {
            type: Boolean,
        },
        hasRoundTwoStarted: {
            type: Boolean,
        },
        hasRoundTwoEnded: {
            type: Boolean,
        },
        hasRoundThreeStarted: {
            type: Boolean,
        },
        hasRoundThreeEnded: {
            type: Boolean,
        },
    },
    { collection: "TeamModel" }
);

module.exports = mongoose.model("TeamModel", teamSchema);
