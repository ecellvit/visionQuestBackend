const XLSX = require('xlsx');
const Team = require('../../models/teamModel');
const catchAsync = require("../../utils/catchAsync");
const path = require('path');

exports.valuationafterR1 = catchAsync(async (req, res, next) => {
  
  try {

    const excelFile = path.join(__dirname, 'investor_smriti.xlsx');
    const workbook = XLSX.readFile(excelFile);

    const sheetName = workbook.SheetNames[3];
    const worksheet = workbook.Sheets[sheetName];


    const jsonData = XLSX.utils.sheet_to_json(worksheet);


    const teamnumber = jsonData.map(row => row['__EMPTY']);
    const valuation_init = jsonData.map(row => row['__EMPTY_2']);
    const VP_init = jsonData.map(row => row['__EMPTY_1']);
    //console.log(jsonData);

    for (let i = 1; i < teamnumber.length; i++) {
      const number = teamnumber[i];
      const valuation = valuation_init[i];
      const vps = VP_init[i];


      await Team.findOneAndUpdate({ teamNumber: number }, { $set: { valuationafterR1: valuation } });
      await Team.findOneAndUpdate({ teamNumber: number }, { $set: { vps: vps } });

    }


    console.log("Valuation updated successfully.");
  } catch (error) {
    console.error('An error occurred:', error);
  }
  
  
});



exports.valuationaftercrises = catchAsync(async (req, res, next) => {
  /*
  try {

    const excelFile = path.join(__dirname, 'investor_smriti.xlsx');
    const workbook = XLSX.readFile(excelFile);

    const sheetName = workbook.SheetNames[3];
    const worksheet = workbook.Sheets[sheetName];


    const jsonData = XLSX.utils.sheet_to_json(worksheet);
<<<<<<< HEAD
    console.log(jsonData);
    
    const teamnumber = jsonData.map(row => row['__EMPTY']);
    const valuation_after_crises = jsonData.map(row => row['__EMPTY_5']);
    const VP_after_crises=jsonData.map(row => row['__EMPTY_6']);
    
    for (let i = 1; i <teamnumber.length; i++) {
      const number = teamnumber[i];
      const valuation = valuation_after_crises[i];
      
      const vps1 = VP_after_crises[i];
      const vps = !isNaN(vps1) ? parseInt(vps1) : 0; // If it's not a number, set it to 0 or handle it differently
     // console.log("vps1",vps1,typeof(vps1));
      //console.log("vps",vps,typeof(vps));
      
      await Team.findOneAndUpdate({ teamnumber: number }, { $set: { valuationaftercrises: valuation } });
      await Team.findOneAndUpdate({ teamnumber: number }, { $set: { vps:vps } });
=======


    const teamnumber = jsonData.map(row => row['__EMPTY']);
    const valuation_after_crises = jsonData.map(row => row['__EMPTY_5']);
    const VP_after_crises = jsonData.map(row => row['__EMPTY_6']);

    for (let i = 0; i < teamnumber.length; i++) {
      const number = teamnumber[i];
      const valuation = valuation_after_crises[i];
      const vps = VP_after_crises[i];


      await Team.findOneAndUpdate({ teamnumber: number }, { $set: { valuation: valuation } });
      await Team.findOneAndUpdate({ teamnumber: number }, { $set: { vps: vps } });
>>>>>>> ea2cee8ae6449e1805e719307354904f5691f301

    }


    console.log("Valuation_after_crises updated successfully.");
  } catch (error) {
    console.error('An error occurred:', error);
  }
  */
  try {

    const excelFile = path.join(__dirname, 'investor1.xlsx');
    const workbook = XLSX.readFile(excelFile);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];


    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);

    const teamnumber = jsonData.map(row => row['teamno']);
    //console.log(teamnumber[10]);
    const valuation_after_crises = jsonData.map(row => row['Valuation_a_crises']);
    //console.log(valuation_after_crises[10]);
    const VP_after_crises = jsonData.map(row => row['Valuation_a_crises']);
   // console.log(VP_after_crises[10]);
    for (let i = 1; i <=teamnumber.length; i++) {
      const number = teamnumber[i-1];
      const valuation = valuation_after_crises[i-1];
      
      const vps1 = VP_after_crises[i-1];
      const vps = !isNaN(vps1) ? parseInt(vps1) : 0; // If it's not a number, set it to 0 or handle it differently
     // console.log("vps1",vps1,typeof(vps1));
      //console.log("vps",vps,typeof(vps));
      
      await Team.findOneAndUpdate({ teamNumber: number }, { $set: { valuationaftercrises: valuation } });
      await Team.findOneAndUpdate({ teamNumber: number }, { $set: { vps:vps } });
    console.log("Valuation updated successfully.");
    
  } 
  res.status(200).json("Valuation updated successfully."); 
} catch (error) {
  console.error('An error occurred:', error);
}});

