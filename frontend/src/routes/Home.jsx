import { useEffect, useState } from "react";
import { MainLayout } from "../layout";
import { useNavigate } from "react-router-dom";
import { DaywiseTimetable } from "../components";

const Home = () => {
  const [timetable, setTimetable] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getVersionFromLocalStorage = JSON.parse(
      localStorage.getItem("version")
    );
    if (getVersionFromLocalStorage !== "v3") {
      localStorage.clear();
      localStorage.setItem("version", JSON.stringify("v3"));
      navigate("/select");
    }
    const getTimetableFromLocalStorage = JSON.parse(
      localStorage.getItem("timetable")
    );
    if (getTimetableFromLocalStorage) {
      setTimetable(getTimetableFromLocalStorage);
    } else {
      navigate("/select");
    }
  }, [navigate]);

  return (
    <MainLayout>
      {timetable ? (
        <div className="text-center">
          {timetable && <DaywiseTimetable timetable={timetable} />}
        </div>
      ) : null}
    </MainLayout>
  );
};

export default Home;
