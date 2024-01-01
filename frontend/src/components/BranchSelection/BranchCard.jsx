import PropTypes from "prop-types";

const BranchCard = ({ selectedBranch, branch, onClickAction }) => {
  return (
    <div
      className={`h-20 flex items-center justify-center border-[0.01px] rounded-sm ${
        selectedBranch === branch.branchCode
          ? "border-2 bg-white/50 border-white"
          : "bg-[#212121] border-white/40"
      }`}
      onClick={() => onClickAction(branch.branchCode)}
    >
      {branch.branchName}
    </div>
  );
};

BranchCard.propTypes = {
  selectedBranch: PropTypes.string,
  branch: PropTypes.shape({
    branchName: PropTypes.string.isRequired,
    branchCode: PropTypes.string.isRequired,
  }).isRequired,
  onClickAction: PropTypes.func.isRequired,
};

export default BranchCard;
