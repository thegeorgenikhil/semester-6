import { Navbar } from "../components";
import PropTypes from "prop-types";

const MainLayout = ({ children, customName }) => {
  return (
    <div className="mt-12 mx-8 max-w-[640px] sm:mx-auto">
      <Navbar customName={customName} />
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
  customName: PropTypes.string,
};

export default MainLayout;
