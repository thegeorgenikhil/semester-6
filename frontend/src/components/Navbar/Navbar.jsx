import { Link } from "react-router-dom";
import SettingsIcon from "../../assets/settings.png";
import PropTypes from "prop-types";

const Navbar = ({ customName }) => {
  const name = customName ?? "Semester6";
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <Link to={"/"}>
            <h1 className="text-white text-2xl font-medium">{name}</h1>
          </Link>
          <p className="text-white/50 text-sm">
            View all your timetable at one place
          </p>
        </div>
        <Link to={"/settings"}>
          <img className="w-5 h-5" src={SettingsIcon} alt="settings icon" />
        </Link>
      </div>
      <div className="h-[1px] w-full bg-white/30 my-3"></div>
    </>
  );
};

Navbar.propTypes = {
  customName: PropTypes.string,
};

export default Navbar;
