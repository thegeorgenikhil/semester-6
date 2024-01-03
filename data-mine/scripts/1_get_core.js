const fs = require("fs");
const xlsx = require("xlsx");

const sheet = xlsx.readFile("./timetable/timetable.xls");
const sheetNames = sheet.SheetNames;

let sheet_data = xlsx.utils.sheet_to_json(sheet.Sheets[sheetNames[0]]);

let currBranch = "";
let currentSubjArr = [];

const branchTag = {
  CSE: "CS",
  CSCE: "CE",
  IT: "IT",
  CSSE: "SE",
};

const coreSectionsInfo = {};

// only for 1st row
const firstRow = sheet_data[0];
currBranch = Object.keys(firstRow)[0];
currentSubjArr = Object.keys(firstRow).filter((_,index) => index !== 0);

for (let i = 0; i < sheet_data.length; i++) {
  const currObj = sheet_data[i];
  const section = currObj["CSE"];
  if (
    section == "CSE" ||
    section == "CSCE" ||
    section == "IT" ||
    section == "CSSE"
  ) {
    currentSubjArr = [];
    currBranch = section;
    Object.values(currObj).forEach((val) => {
      if (val !== section) {
        currentSubjArr.push(val);
      }
    });
    coreSectionsInfo[branchTag[currBranch]] = {};
    continue;
  }

  if (section == "ML_CS") {
    break;
  }

  if (section == "Section-wise faculty members’ names") {
    continue;
  }

  const tt = {};

  Object.values(currObj).forEach((val, index) => {
    if (val !== section) {
      tt[currentSubjArr[index - 1]] = val;
    }
  });

  coreSectionsInfo[branchTag[currBranch]] = {
    ...coreSectionsInfo[branchTag[currBranch]],
    [section]: tt,
  };
}

fs.writeFileSync("./source_data/core.json", JSON.stringify(coreSectionsInfo));
