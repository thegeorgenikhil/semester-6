import PropTypes from "prop-types";
import { dayMap } from "./day-map";
import SubjectCard from "../SubjectCard/SubjectCard";
import NoClassImage from "../../assets/no_class.svg";
import LeftArrow from "../../assets/left.png";
import RightArrow from "../../assets/right.png";
import { useState } from "react";

const DaywiseTimetableHeader = ({
  dayName,
  onRightArrowClick,
  onLeftArrowClick,
  children,
}) => {
  return (
    <>
      <div className="flex  justify-between items-center">
        <img
          className="w-4"
          src={LeftArrow}
          alt="Left Arrow"
          onClick={onLeftArrowClick}
        />
        <h1 className="text-2xl font-medium pt-4 pb-3">{dayName}</h1>
        <img
          className="w-4"
          src={RightArrow}
          alt="Right Arrow"
          onClick={onRightArrowClick}
        />
      </div>
      {children}
    </>
  );
};

const DaywiseTimetable = ({ timetable }) => {
  const [dayIndex, setDayIndex] = useState(new Date().getDay());
  const day = dayMap[dayIndex]["code"];
  const dayName = dayMap[dayIndex]["name"];

  const onRightArrowClick = () => {
    if (dayIndex === 6) {
      setDayIndex(0);
    } else {
      setDayIndex(dayIndex + 1);
    }
  };

  const onLeftArrowClick = () => {
    if (dayIndex === 0) {
      setDayIndex(6);
    } else {
      setDayIndex(dayIndex - 1);
    }
  };

  if (day === "SUN") {
    return (
      <div className="flex flex-col gap-3">
        <DaywiseTimetableHeader
          onLeftArrowClick={onLeftArrowClick}
          onRightArrowClick={onRightArrowClick}
          dayName={dayName}
        >
          <img src={NoClassImage} alt="No classes today" />
          <p className="text-xl">No classes today!</p>
        </DaywiseTimetableHeader>
      </div>
    );
  }

  const coreTimetable = timetable.core_timetable[day];
  const elective1Timetable = timetable.elective1_timetable[day];
  const elective2Timetable = timetable.elective2_timetable[day];

  const groupedTimetable = [
    ...coreTimetable,
    ...elective1Timetable,
    ...elective2Timetable,
  ];

  const timings = [
    "8-9",
    "9-10",
    "10-11",
    "11-12",
    "12-1",
    "1-2",
    "2-3",
    "3-4",
    "4-5",
    "5-6",
  ];

  const colors = [
    "bg-[#7f5af0]",
    "bg-[#f6ad55]",
    "bg-[#48bb78]",
    "bg-[#ed64a6]",
    "bg-[#f56565]",
    "bg-[#9f7aea]",
    "bg-[#ed8936]",
    "bg-[#38b2ac]",
    "bg-[#667eea]",
    "bg-[#f56565]",
  ];

  const sortedTimeTable = [];

  for (let i = 0; i < timings.length; i++) {
    const time = timings[i];
    const subject = groupedTimetable.find((subject) => subject.TIME === time);
    if (subject) {
      sortedTimeTable.push(subject);
    }
  }

  if (sortedTimeTable.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <DaywiseTimetableHeader
          onLeftArrowClick={onLeftArrowClick}
          onRightArrowClick={onRightArrowClick}
          dayName={dayName}
        >
          <img src={NoClassImage} alt="No classes today" />
          <p className="text-xl">No classes today!</p>
        </DaywiseTimetableHeader>
      </div>
    );
  }

  return (
    <DaywiseTimetableHeader
      onLeftArrowClick={onLeftArrowClick}
      onRightArrowClick={onRightArrowClick}
      dayName={dayName}
    >
      <div className="flex flex-col gap-3 mb-8">
        {sortedTimeTable.map((core, index) => {
          return (
            <SubjectCard key={index} subject={core} color={colors[index]} />
          );
        })}
      </div>
    </DaywiseTimetableHeader>
  );
};

DaywiseTimetableHeader.propTypes = {
  dayName: PropTypes.string,
  onRightArrowClick: PropTypes.func,
  onLeftArrowClick: PropTypes.func,
  children: PropTypes.node,
};

DaywiseTimetable.propTypes = {
  timetable: PropTypes.object,
};

export default DaywiseTimetable;
