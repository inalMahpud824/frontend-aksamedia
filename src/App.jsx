
function App() {
  const username = atob(window.localStorage.getItem("token"));

  // console.log(username);
  return (
    <>
    {/* navbar */}
    <div className="bg-blue-700 flex justify-between items-center w-full px-5 py-4">
      <h1 className="text-white text-center font-bold text-xl p-2">{username}</h1>
      <div className="">
        <button className="text-white bg-slate-600 px-3 py-2">Logout</button>
      </div>
    </div>

    </>
  );
}

export default App;
