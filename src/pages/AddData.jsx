import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddDataPage = () => {
  const [activityName, setActivityName] = useState("");
  const [activities, setActivities] = useState([]);
  // const [test, setTest] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const storedActivities = localStorage.getItem("activities");
    if (!storedActivities) {
      localStorage.setItem("activities", JSON.stringify(activities));
    } else {
      setActivities( JSON.parse(storedActivities));
    }
  }, []);
  // console.log(test);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activityName) return;

    const newActivity = {
      id: activities.length + 1,
      name: activityName,
    };

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));

    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="wrapper p-7">
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-4">Tambah Aktivitas Baru</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Aktivitas
              </label>
              <input
                type="text"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Masukkan nama aktivitas"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Tambah
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/")}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDataPage;
