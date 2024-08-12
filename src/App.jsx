import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBox from "./components/SearchBox";

function App() {
  const activitiesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedActivities = localStorage.getItem("activities");
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page")) || 1;
    const search = queryParams.get("q") || "";

    setCurrentPage(page);
    setSearch(search);

    // Filter activities berdasarkan query search
    const filtered = activities.filter((activity) =>
      activity.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [location.search, activities]);

  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);

  const currentActivities = filteredActivities.slice(
    (currentPage - 1) * activitiesPerPage,
    currentPage * activitiesPerPage
  );

  const handleNextPage = () => {
    changePage(Math.min(currentPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    changePage(Math.max(currentPage - 1, 1));
  };

  const handleDelete = (id) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  };

  const changePage = (page) => {
    setCurrentPage(page);
    if (search) {
      navigate(`?page=${page}&q=${search}`);
      return;
    }
    navigate(`?page=${page}`);
  };

  return (
    <>
      <div className="wrapper pb-5">
      <Navbar page={currentPage} />
        <div className="flex items-center justify-center ">
          <SearchBox page={currentPage} />
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-4 ml-4 "
            onClick={() => navigate("/add")}
          >
            Tambah Aktivitas
          </button>
        </div>
        <table className="bg-white mx-auto p-7 rounded-lg border border-gray-300 w-3/4 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Activities</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentActivities.map((activity, index) => (
              <tr key={activity.id}>
                <td className="py-2 px-4 border-b text-center">
                  {(currentPage - 1) * activitiesPerPage + index + 1}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {activity.name}
                </td>
                <td className="flex justify-center items-center py-2 px-4 border-b text-center">
                  <Link to={`/update/${activity.id}`}>
                    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(activity.id)}
                  >
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
          <span className="py-2 px-4 dark:text-white">
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
      </div>
    </>
  );
}

export default App;
