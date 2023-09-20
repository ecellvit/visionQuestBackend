const XLSX = require('xlsx');
const Team = require('../../models/teamModel');
const catchAsync = require("../../utils/catchAsync");
const path = require('path');

exports.valuation = catchAsync(async (req, res, next) => {
  try {
    
    const excelFile = path.join(__dirname, 'test.xlsx');
    const workbook = XLSX.readFile(excelFile);
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

   
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    
    const teamnumber = jsonData.map(row => row['sr no']);
    const valuation12 = jsonData.map(row => row['Valuation1']);
    
    
    for (let i = 0; i < teamnumber.length; i++) {
      const number = teamnumber[i];
      const valuation = valuation12[i];

      
      await Team.findOneAndUpdate({ teamnumber: number }, { $set: { valuation: valuation } });

      
    }

    
    console.log("Valuation updated successfully.");
  } catch (error) {
    console.error('An error occurred:', error);
  }
});



exports.valuationaftercrises = catchAsync(async (req, res, next) => {
  try {
    
    const excelFile = path.join(__dirname, 'test.xlsx');
    const workbook = XLSX.readFile(excelFile);
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

   
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    
    const teamnumber = jsonData.map(row => row['sr no']);
    const valuation12 = jsonData.map(row => row['Valuationaf']);
    const vp = jsonData.map(row => row['VP']);
    
    for (let i = 0; i < teamnumber.length; i++) {
      const number = teamnumber[i];
      const valuation = valuation12[i];
      const vps=vp[i];

      
      await Team.findOneAndUpdate({ teamnumber: number }, { $set: { valuation: valuation } });
      await Team.findOneAndUpdate({ teamnumber: number }, { $set: { vps:vps } });

      
    }

    
    console.log("Valuation_after_crises updated successfully.");
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

