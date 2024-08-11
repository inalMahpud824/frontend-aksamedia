import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDataPage = () => {
  const [activityName, setActivityName] = useState("");
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Menangkap id dari URL

  useEffect(() => {
    const storedActivities = localStorage.getItem("activities");
    if (!storedActivities) {
      localStorage.setItem("activities", JSON.stringify(activities));
    } else {
      setActivities(JSON.parse(storedActivities));
    }

    if (id) {
      const activityToUpdate = JSON.parse(storedActivities).find(
        (activity) => activity.id === parseInt(id)
      );
      if (activityToUpdate) {
        setActivityName(activityToUpdate.name);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activityName) return;

    const newActivity = {
      id: parseInt(id),
      name: activityName,
    };

    const updatedActivities = id
      ? activities.map((activity) =>
          activity.id === parseInt(id) ? newActivity : activity
        )
      : [...activities, newActivity];

    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));

    navigate("/");
  };


  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Update Aktivitas" : "Tambah Aktivitas Baru"}
      </h2>
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
            {id ? "Update" : "Tambah"}
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
  );
};

export default UpdateDataPage;

