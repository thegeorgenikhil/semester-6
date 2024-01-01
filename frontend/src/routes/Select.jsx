import { useEffect, useState } from "react";
import { BranchSelection, ClassSelection, Loader } from "../components";
import { MainLayout } from "../layout";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Select = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedElective1, setSelectedElective1] = useState(null);
  const [selectedElective2, setSelectedElective2] = useState(null);

  const [classesAvaiable, setClassesAvaiable] = useState([]);
  const [electivesAvaiable, setElectivesAvailable] = useState({
    elective1: [],
    elective2: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getClassesAvaiable = async (branchCode) => {
    const res = await api.get(`data/core_sections.json`);
    const data = res.data;
    return {
      data: {
        sections: data[branchCode],
      },
    };
  };

  const getElectivesAvaiable = async (branchCode) => {
    const elRes1 = api.get(`data/electives_1.json`);
    const elRes2 = api.get(`data/electives_2.json`);
    const [res1, res2] = await Promise.all([elRes1, elRes2]);
    const data1 = res1.data;
    const data2 = res2.data;
    return {
      data: {
        electives1: data1[branchCode],
        electives2: data2[branchCode],
      },
    };
  };

  const setupTimetableHandler = async () => {
    setIsLoading(true);

    try {
      const coreReq = api.post(`data/core_timetable.json`);
      const electiveReq = api.post(`data/elective_timetable.json`);

      const [coreRes, electiveRes] = await Promise.all([coreReq, electiveReq]);
      const coreData = coreRes.data;
      const electiveData = electiveRes.data;

      const timetable = {
        core_timetable: coreData[selectedClass],
        elective1_timetable: electiveData[selectedElective1],
        elective2_timetable: electiveData[selectedElective2],
      };

      localStorage.setItem("timetable", JSON.stringify(timetable));

      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getInfoFromBranch = async (branchCode) => {
      const [classesAvaiable, electivesAvaiable] = await Promise.all([
        getClassesAvaiable(branchCode),
        getElectivesAvaiable(branchCode),
      ]);

      setClassesAvaiable(classesAvaiable.data.sections);
      setSelectedClass(classesAvaiable.data.sections[0]);

      setElectivesAvailable({
        elective1: electivesAvaiable.data.electives1,
        elective2: electivesAvaiable.data.electives2,
      });
      setSelectedElective1(electivesAvaiable.data.electives1[0]);
      setSelectedElective2(electivesAvaiable.data.electives2[0]);
    };

    if (selectedBranch) {
      getInfoFromBranch(selectedBranch);
    }
  }, [selectedBranch]);

  return (
    <MainLayout>
      <BranchSelection
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />
      {classesAvaiable.length > 0 && (
        <ClassSelection
          classSelectionHeading={"Select Core Section: "}
          classSelectionName={"CoreSections"}
          classesAvaiable={classesAvaiable}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
      )}
      {electivesAvaiable.elective1.length > 0 && (
        <ClassSelection
          classSelectionHeading={"Select Elective 1: "}
          classSelectionName={"Elective1"}
          classesAvaiable={electivesAvaiable.elective1}
          selectedClass={selectedElective1}
          setSelectedClass={setSelectedElective1}
        />
      )}
      {electivesAvaiable.elective2.length > 0 && (
        <ClassSelection
          classSelectionHeading={"Select Elective 2: "}
          classSelectionName={"Elective2"}
          classesAvaiable={electivesAvaiable.elective2}
          selectedClass={selectedElective2}
          setSelectedClass={setSelectedElective2}
        />
      )}
      {selectedBranch &&
        selectedClass &&
        selectedElective1 &&
        selectedElective2 && (
          <button
            onClick={setupTimetableHandler}
            className="bg-[#0663e5] w-full h-12 flex justify-center items-center p-3 font-medium rounded-sm mb-12"
          >
            {isLoading ? <Loader /> : "Setup Timetable"}
          </button>
        )}
    </MainLayout>
  );
};

export default Select;
