import{ useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const activitiesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const storedActivities = localStorage.getItem('activities')

    if (storedActivities) {
      setActivities(JSON.parse(storedActivities))
    }
  }, [])

  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  const currentActivities = activities.slice(
    (currentPage - 1) * activitiesPerPage,
    currentPage * activitiesPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDelete = (id) => {
    const updatedActivities = activities.filter((activity) => activity.id !== id);
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
  };


  return (
    <>
      <Navbar />
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-4 ml-4 "
        onClick={() => navigate("/add")}
      >
        Tambah Aktivitas
      </button>
      <table className="bg-white mx-auto p-7 rounded-lg border border-gray-300 w-3/4 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Activities</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentActivities.map((activity) => (
            <tr key={activity.no}>
              <td className="py-2 px-4 border-b text-center">{activity.no}</td>
              <td className="py-2 px-4 border-b text-center">
                {activity.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <Link to={`/update/${activity.id}`}>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2">
                  Edit
                </button>
                </Link>
                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(activity.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-l"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="py-2 px-4">
          {currentPage} / {totalPages}
        </span>
        <button
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-r"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
