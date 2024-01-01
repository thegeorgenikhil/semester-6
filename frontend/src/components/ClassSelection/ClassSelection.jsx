import PropTypes from "prop-types";

const ClassSelection = ({
  classSelectionName,
  classSelectionHeading,
  classesAvaiable,
  setSelectedClass,
  selectedClass,
}) => {
  return (
    <div className="my-5">
      <h3 className="text-2xl font-medium my-3">{classSelectionHeading}</h3>
      <select
        value={selectedClass ?? ""}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="bg-[#212121] border border-gray-300 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        name={classSelectionName}
      >
        {classesAvaiable.map((classAvaiable) => (
          <option
            className="text-white"
            key={classAvaiable}
            value={classAvaiable}
          >
            {classAvaiable}
          </option>
        ))}
      </select>
    </div>
  );
};

ClassSelection.propTypes = {
  classSelectionHeading: PropTypes.string,
  classSelectionName: PropTypes.string,
  classesAvaiable: PropTypes.array,
  setSelectedClass: PropTypes.func,
  selectedClass: PropTypes.string,
};

export default ClassSelection;
