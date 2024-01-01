import BranchCard from "./BranchCard";
import PropTypes from "prop-types";

const branchInfo = [
  {
    branchName: "CSE",
    branchCode: "CS",
  },
  {
    branchName: "CSCE",
    branchCode: "CE",
  },
  {
    branchName: "CSSE",
    branchCode: "SE",
  },
  {
    branchName: "IT",
    branchCode: "IT",
  },
];

const BranchSelection = ({ selectedBranch, setSelectedBranch }) => {
  const onClickAction = (branchCode) => {
    setSelectedBranch(branchCode);
  };
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-medium my-3">Select Branch: </h1>
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {branchInfo.map((branch, index) => {
          return (
            <BranchCard
              selectedBranch={selectedBranch}
              key={index}
              branch={branch}
              onClickAction={onClickAction}
            />
          );
        })}
      </div>
    </div>
  );
};

BranchSelection.propTypes = {
  selectedBranch: PropTypes.string,
  setSelectedBranch: PropTypes.func,
};

export default BranchSelection;
