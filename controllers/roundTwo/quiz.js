const XLSX = require('xlsx');
const Team = require('../../models/teamModel');
const catchAsync = require("../../utils/catchAsync");
const path = require('path');
const { valuationaftercrises } = require('./file');

exports.quiz = catchAsync(async (req, res, next) => {
    try {
    
        const excelFile = path.join(__dirname, 'investor_smriti.xlsx');
        const workbook = XLSX.readFile(excelFile);
        
        const sheetName = workbook.SheetNames[3];
        const worksheet = workbook.Sheets[sheetName];
    
       
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
        
        const teamnumber = jsonData.map(row => row['__EMPTY']);
       
        const VP_after_quiz=jsonData.map(row => row['__EMPTY_9']);
        
        for (let i = 0; i < teamnumber.length; i++) {
          const number = teamnumber[i];
       
          const vps=VP_after_quiz[i];
    
          
          
          await Team.findOneAndUpdate({ teamnumber: number }, { $set: { vps:vps } });
    
          
        }
    
        
        console.log("Valuation_after_crises updated successfully.");
      } catch (error) {
        console.error('An error occurred:', error);
      }
});
