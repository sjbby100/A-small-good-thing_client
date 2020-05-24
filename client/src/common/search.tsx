import React from "react";

const Search = ({ onChange }: any) => {
  return (
    <input
      type="text"
      className="main_search"
      onChange={({ target }) => onChange(target.value)}
      placeholder="검색"
    />
  );
};
export default Search;
