const fs = require("fs");
const coreSectionsInfo = require("../source_data/core.json");
const subjects = ["cs", "it", "ce", "se"];

const core_sections = {};

for (let i = 0; i < subjects.length; i++) {
  const subject = subjects[i];
  const sections = [];

  for (const key in coreSectionsInfo[subject.toUpperCase()]) {
    sections.push(key);
  }

  core_sections[subject.toUpperCase()] = sections;
}

fs.writeFileSync("./data/core_sections.json", JSON.stringify(core_sections));
