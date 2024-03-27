// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const { search } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { text } = search;

  const handleChangSearch = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: {
        text: e.target.value,
      },
    });
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    navigate("/shop?" + text);
  };
  return (
    <form action="" onSubmit={handleSubmitSearch} >
      <label className="input input-bordered flex items-center gap-2 bg-gray-300">
        <input
          type="text"
          className=" bg-gray-300 text-gray-700 font-medium text-[24px]"
          placeholder="Search"
          onChange={(e) => handleChangSearch(e)}
        />
        <span className="badge badge-active p-4 flex justify-center"><SearchIcon/></span>
      </label>
    </form>
  );
};

export default Search;
