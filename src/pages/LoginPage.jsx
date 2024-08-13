import { useEffect, useState } from "react";
import InputComponent from "../components/Input";
import { users } from "../data/dataLogin.js";

export default function LoginPage() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    let storedUsers = localStorage.getItem("users");
    const token = window.localStorage.getItem("token");
    if (token) {
      window.location.href = "/";
    }
    if (!storedUsers) {
      localStorage.setItem("users", JSON.stringify(users));
      storedUsers = JSON.stringify(users);
    }

    setUsersData(JSON.parse(storedUsers));
  }, []);
  const generateToken = (username) => {
    const token = btoa(`${username}:${new Date().getTime()}`);
    return token;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Mencegah form dari reload halaman
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");
    const user = usersData.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("token", generateToken(username));
      window.location.href = "/";
    } else {
      alert("Invalid username or password");
      event.target.reset();
    }
  };


  return (
    <>
      <div className="w-full min-h-screen bg-white flex justify-center items-center dark:bg-slate-800">
        <div className="p-2 w-[80%] md:w-[65%] lg:w-[50%] xl:w-[40%] bg-slate-500 rounded-xl text-white shadow-md">
          <h2 className="font-bold text-center py-5 md:text-xl lg:text-2xl xl:text-3xl text-lg">
            Login
          </h2>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-center w-full px-0 md:px-2 lg:px-4 xl:px-8"
          >
            <InputComponent type={"text"} id={"username"}>
              Username
            </InputComponent>
            <InputComponent type={"password"} id={"password"}>
              Password
            </InputComponent>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-7 py-3 bg-blue-400 rounded-lg font-semibold outline-none hover:bg-blue-300 text-sm md:text-md lg:text-xl xl:text-2xl"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
