import { CircleSpinner } from "react-spinners-kit";
const Loader = () => {
  return (
    <div className="loader-container">
      <CircleSpinner
        size={1.2}
        sizeUnit={"rem"}
        color="#FFFFFF"
        className="margin-auto"
      />
    </div>
  );
};

export default Loader;
