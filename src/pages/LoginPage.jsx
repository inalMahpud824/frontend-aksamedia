import InputComponent from "../components/Input";
import { users } from "../data/data";


export default function LoginPage () {

  const generateToken = (username) => {
    const token = btoa(`${username}:${new Date().getTime()}`);
    return token;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Mencegah form dari reload halaman
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");
    const user = users.find(
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
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="p-2 w-[50%] bg-slate-500 rounded-xl text-white shadow-md">
          <h2 className="text-3xl font-bold text-center py-5">Login</h2>
          <form action="" onSubmit={handleSubmit} className="flex flex-col justify-center w-full px-8">
            <InputComponent type={"text"} id={"username"}>
              Username
            </InputComponent>
            <InputComponent type={"password"} id={"password"}>
              Password
            </InputComponent>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-7 py-3 bg-blue-400 text-xl rounded-lg font-semibold outline-none hover:bg-blue-300"
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