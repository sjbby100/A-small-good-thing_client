import React from "react";

const Search = ({ onChange }: any) => {
  return (
    <input type="text" onChange={({ target }) => onChange(target.value)} />
  );
};
export default Search;
