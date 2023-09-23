const XLSX = require('xlsx');
const Team = require('../../models/teamModel');
const catchAsync = require("../../utils/catchAsync");
const path = require('path');

exports.quiz = catchAsync(async (req, res, next) => {
  try {

    const excelFile = path.join(__dirname, 'QUIZ FINAL EXCEL 2.xlsx');
    const workbook = XLSX.readFile(excelFile);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];


    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);

    const teamNumber = jsonData.map(row => row['Team No']);
    console.log(teamNumber);
    const scores = jsonData.map(row => row['Score']);
    console.log(scores);

    for (let i = 0; i < teamNumber.length; i++) {
      const number = teamNumber[i];
      const quizScore = scores[i];
      const team = await Team.findOne({ teamNumber: number });
      console.log(team.vps);
      const newVps = team.vps + Math.round(((quizScore*2)/10 ));
      const newValuation = newVps * 100;
      await Team.findOneAndUpdate({ teamNumber: number }, { $set: { vps: newVps, valuation: newValuation } });
    }
    console.log("Valuation updated successfully.");
    res.status(200).json("Valuation updated successfully.");
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

exports.quiz1 = catchAsync(async (req, res, next) => {
    try {
  
      const excelFile = path.join(__dirname, 'QUIZ FINAL EXCEL 2.xlsx');
      const workbook = XLSX.readFile(excelFile);
  
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
  
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);
  
      const teamNumber = jsonData.map(row => row['Team No']);
      console.log(teamNumber);
      const scores = jsonData.map(row => row['Score']);
      console.log(scores);
  
      for (let i = 0; i < teamNumber.length; i++) {
        const number = teamNumber[i];
        const quizScore = scores[i];
        const team = await Team.findOne({ teamNumber: number });
        console.log(team.vps);
        const newVps =  Math.round(((quizScore) ));
        //const newValuation = newVps * 100;
        await Team.findOneAndUpdate({ teamNumber: number }, { $set: { vps: newVps } });
      }
      console.log("Valuation updated successfully.");
      res.status(200).json("Valuation updated successfully.");
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
