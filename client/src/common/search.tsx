import React from "react";

interface searchProps {
  onChange: Function;
  location?: string;
}

const Search = ({ onChange, location = "main" }: searchProps) => {
  return (
    <input
      type="text"
      className={`${location}_search`}
      onChange={({ target }) => onChange(target.value)}
      placeholder="검색"
    />
  );
};
export default Search;
