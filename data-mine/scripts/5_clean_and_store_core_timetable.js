const xlsx = require("xlsx");
const fs = require("fs");

const coreSectionInfo = require("../source_data/core.json");

const allCoreSectionsObj = {};

for (const key in coreSectionInfo) {
  for (const section in coreSectionInfo[key]) {
    allCoreSectionsObj[section] = coreSectionInfo[key][section];
  }
}

const sheet = xlsx.readFile("./timetable/timetable.xls");
const sheetNames = sheet.SheetNames;

let sheet_data = xlsx.utils.sheet_to_json(sheet.Sheets[sheetNames[3]]);

const timetable = {};

sheet_data.map((data) => {
  if (data["DAY"] !== "DAY") {
    // to avoid the first row for each section
    let current_section = data["Section"];
    current_section = current_section.split("-").join("");
    const current_day = data["DAY"];
    if (timetable[current_section] === undefined) {
      timetable[current_section] = {};
    }

    timetable[current_section][current_day] = [];

    let current_room = "";
    for (const key in data) {
      if (key !== "DAY" && key !== "Section") {
        // parse through the keys and exclude DAY and Section
        if (key.includes("ROOM")) {
          // if the key is a room no
          if (data[key] !== "---") {
            // if the room no is not "---" (empty state) then store it in current_room
            current_room = data[key];
          }
        } else {
          if (data[key] !== "X") {
            // if its not a room then it will be a time slot, if its not "X" (empty state) then store it in timetable
            timetable[current_section][current_day].push({
              TIME: key,
              SUBJECT: data[key],
              ROOM: current_room,
              FACULTY_NAME: allCoreSectionsObj[current_section][data[key]],
            });
          }
        }
      }
    }
  }
});

fs.writeFileSync("./data/core_timetable.json", JSON.stringify(timetable));
