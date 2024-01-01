const fs = require("fs");
const xlsx = require("xlsx");

const sheet = xlsx.readFile("./timetable/timetable.xls");
const sheetNames = sheet.SheetNames;

let sheet_data = xlsx.utils.sheet_to_json(sheet.Sheets[sheetNames[2]]);

let turnSwitch = false;

let currBranch = "";
let currElectiveCode = "";

const electiveSectionsInfo = {};

for (let i = 0; i < sheet_data.length; i++) {
  const currObj = sheet_data[i];
  const section = currObj["School of Computer Engineering"];
  if (section == "ML_CS") {
    turnSwitch = true;
  }

  if (turnSwitch) {
    const secondV = Object.values(currObj)[1];
    if (secondV === "DE1" || secondV === "DE2") {
      currBranch = section.split("_")[1];
      currElectiveCode = secondV;
      if (!electiveSectionsInfo[currBranch]) {
        electiveSectionsInfo[currBranch] = {};
      }

      if (!electiveSectionsInfo[currBranch][currElectiveCode]) {
        electiveSectionsInfo[currBranch][currElectiveCode] = {};
      } else {
        electiveSectionsInfo[currBranch] = {
          ...electiveSectionsInfo[currBranch],
          [currElectiveCode]: {
            ...electiveSectionsInfo[currBranch][currElectiveCode],
          },
        };
      }
    } else {
      const tt = {};
      const a = Object.values(currObj);
      tt[a[0]] = {
        FACULTY_NAME: a[1],
      };
      electiveSectionsInfo[currBranch][currElectiveCode] = {
        ...electiveSectionsInfo[currBranch][currElectiveCode],
        ...tt,
      };
    }
  }
}

fs.writeFileSync(
  "./source_data/electives.json",
  JSON.stringify(electiveSectionsInfo)
);
