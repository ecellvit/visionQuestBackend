const mongoose = require('mongoose');
const path = require('path');
const Team = require('../models/teamModel'); // Import your Team model here
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
mongoose.connect(process.env.db_url, {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Connected");
});


const industries = [
    'IT',
    'Fashion',
    'Petrochemical',
    'Automobile',
    'Healthcare',
    'Finance',
];
const maxTeamsPerIndustry = 3;

async function assignIndustriesToTeams() {
    try {
        const teams = await Team.find({});
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
    } catch (error) {
        console.error('Error assigning industries:', error);
    } finally {
        mongoose.disconnect();
    }
}

assignIndustriesToTeams();