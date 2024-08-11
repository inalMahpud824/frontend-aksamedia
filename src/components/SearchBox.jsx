import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox({page}) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (query) {
        if(page && page !== 1){
          navigate(`?page=${page}&q=${query}`);
          setQuery("");
          return
        }
        navigate(`?q=${query}`);
        setQuery("");
      }
    };

    const handleChange = (e) => {
      setQuery(e.target.value);
    };
  return (
    <>
        <form
          action=""
          onSubmit={handleSubmit}
          className="bg-white flex items-center rounded-md shadow-md px-2 w-[25%]"
        >
          <input
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            className=" outline-none p-3 rounded-md bg-white w-full"
          />
        </form>
    </>
  );
}