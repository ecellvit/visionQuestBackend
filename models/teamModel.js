const mongoose = require('mongoose');

const teamSchema = mongoose.Schema(
    {
        teamname: {
            type: String,
            unique: true
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
            type: Number
        },
        score: {
            type: Number
        }
    },
    { collection: "TeamModel" }
);

module.exports = mongoose.model("TeamModel", teamSchema);
