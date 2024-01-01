import PropTypes from "prop-types";

const SubjectCard = ({ subject, color }) => {
  const { ROOM, TIME, SUBJECT, FACULTY_NAME } = subject;
  return (
    <div className={`flex items-center ${color} p-4 rounded-sm`}>
      <div className="text-left">
        <p className="text-3xl font-bold">{TIME}</p>
        <p className="text-xs">Room No:</p>
        <p className="text-xs font-bold">{ROOM}</p>
      </div>
      <div className=" flex-auto ">
        <p className="text-4xl">{SUBJECT}</p>
        <p>{FACULTY_NAME}</p>
      </div>
    </div>
  );
};

SubjectCard.propTypes = {
  subject: PropTypes.object,
  color: PropTypes.string,
};

export default SubjectCard;
