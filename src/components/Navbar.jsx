import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navbarClick, setNavbarClick] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
    }
  }, [])
  const dataUser = atob(window.localStorage.getItem("token"));
  const username = dataUser.split(":")[0];
  const handleNavbarClick = () => {
    setNavbarClick(!navbarClick);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  }
  // console.log(navbarClick);
  return (
    <>
      <div className="bg-blue-700 flex justify-between items-center w-full gap-7 px-5 py-4 relative">
        <div className="">
        </div>
        <div className="flex items-center gap-7">
          <Link to={"/profile/edit"}>
            <h1
              className={`text-white text-center font-bold text-xl p-2 ${
                navbarClick ? "hidden" : "block"
              }`}
            >
              {username}
            </h1>
          </Link>

          <button
            id="hamburger"
            name="hamburger"
            className="block right-4"
            onClick={handleNavbarClick}
          >
            <span
              className={`hamburger-line ${
                navbarClick ? "origin-top-left rotate-45" : ""
              } transition duration-300 ease-in-out origin-top-left`}
            ></span>
            <span
              className={`hamburger-line duration-300 ease-in-out ${
                navbarClick ? "origin-bottom-left -rotate-45 scale-0" : ""
              }`}
            ></span>
            <span
              className={`hamburger-line duration-300 ease-in-out ${
                navbarClick ? "origin-bottom-left -rotate-45" : ""
              }`}
            ></span>
          </button>
        </div>
        <div
          className={`bg-white shadow-md rounded-lg block absolute right-10 -bottom-28 overflow-hidden w-28 ${
            navbarClick ? "block" : "hidden"
          }`}
        >
          <button className="dropdown" onClick={handleLogout}>
            Logout
          </button>
          <Link to={"/profile/edit"} className="dropdown">
            {username}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
