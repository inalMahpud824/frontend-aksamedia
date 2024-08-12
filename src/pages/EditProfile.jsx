import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [profileName, setProfileName] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dataUser = atob(window.localStorage.getItem("token"));
    const username = dataUser.split(":")[0];
    setCurrentUserName(username);
    
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsersData(JSON.parse(storedUsers));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!profileName) return;

    // Update username untuk user yang sedang login
    const updatedUsers = usersData.map((user) =>
      user.username === currentUserName ? { ...user, username: profileName } : user
    );

    // Simpan kembali data users ke localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update token dengan username baru
    const newToken = btoa(`${profileName}:${currentUserName.split(":")[1]}`);
    window.localStorage.setItem("token", newToken);

    // Navigasi kembali ke halaman utama
    navigate("/");
  };

  return (
    <div className="wrapper">
      <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ubah Username
            </label>
            <input
              type="text"
              value={profileName || currentUserName} // Perubahan
              onChange={(e) => setProfileName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Masukkan username baru"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Ubah
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
  );
}
