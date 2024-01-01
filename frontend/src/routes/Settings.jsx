import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layout";

const Settings = () => {
  const navigate = useNavigate();
  const resetClassHandler = () => {
    if (confirm("Are you sure you want to reset your classes?")) {
      localStorage.removeItem("timetable");
      navigate("/");
    }
  };

  return (
    <MainLayout customName={"Settings"}>
      <p className="text-md text-white/90 text-center mt-6">
        Reset your classes and start from scratch?
      </p>
      <div className="flex justify-center">
        <button
          onClick={resetClassHandler}
          className="bg-red-500 px-4 w-full sm:w-fit text-center py-1 rounded-sm hover:opacity-95 mt-3"
        >
          Reset Classes
        </button>
      </div>
    </MainLayout>
  );
};

export default Settings;
