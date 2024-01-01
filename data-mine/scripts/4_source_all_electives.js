const fs = require("fs");
const electivesInfo = require("../source_data/electives.json");

const subjects = ["cs", "it", "ce", "se"];

const electives_1 = {};
const electives_2 = {};

// GROUP OF ELECTIVE-1
for (let i = 0; i < subjects.length; i++) {
  const subject = subjects[i];
  const electives = [];

  const data = electivesInfo[subject.toUpperCase()]["DE1"];

  for (const key in data) {
    electives.push(key);
  }

  electives_1[subject.toUpperCase()] = electives;
}

// GROUP OF ELECTIVE-2
for (let i = 0; i < subjects.length; i++) {
  const subject = subjects[i];
  const electives = [];

  const data = electivesInfo[subject.toUpperCase()]["DE2"];

  for (const key in data) {
    electives.push(key);
  }

  electives_2[subject.toUpperCase()] = electives;
}

fs.writeFileSync("./data/electives_1.json", JSON.stringify(electives_1));
fs.writeFileSync("./data/electives_2.json", JSON.stringify(electives_2));
