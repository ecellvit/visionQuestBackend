const mongoose = require('mongoose');
const teamSchema = mongoose.Schema(
    {
        teamname: {
            type: String,
            unique: true
        },
        teamLeaderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        teamnumber: {
            type: Number
        },
        Leadername: {
            type: String
        },
        LeaderEmail: {
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
        score: {
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
        hasRoundOneEnd: {
            type: Boolean,
        },
        hasRoundTwoStarted: {
            type: Boolean,
        },
        hasRoundTwoEnd: {
            type: Boolean,
        },
        hasRoundThreeStarted: {
            type: Boolean,
        },
        hasRoundThreeEnd: {
            type: Boolean,
        },
    },
    { collection: "TeamModel" }
);

module.exports = mongoose.model("TeamModel", teamSchema);
