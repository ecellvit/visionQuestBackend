const XLSX = require('xlsx');
const Team = require('../../models/teamModel');
const catchAsync = require("../../utils/catchAsync");
const path = require('path');

exports.quiz = catchAsync(async (req, res, next) => {
  try {
    
    const excelFile = path.join(__dirname, 'updated_quiz.xlsx');
    const workbook = XLSX.readFile(excelFile);
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

   
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);
    
    const teamnumber = jsonData.map(row => row['Team No']);
    console.log(teamnumber);
    const scores = jsonData.map(row => row['Score']);
    console.log(scores);
    
    for (let i = 0; i < teamnumber.length; i++) {
      const number = teamnumber[i];
      const valuation = scores[i]/10;

      
      await Team.findOneAndUpdate({ teamnumber: number }, { $set: { vps: valuation } });

      
    }

    
    console.log("Valuation updated successfully.");
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
