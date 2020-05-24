import React from "react";

export default function Filter({ onChange, orderBy }: any) {
  const handleOrder = () => {
    orderBy[1] === "asc"
      ? onChange([orderBy[0], "desc"])
      : onChange([orderBy[0], "asc"]);
  };
  return (
    <div className="main_filter_box">
      <select onChange={({ target: { value } }) => onChange([value, "asc"])}>
        <option value="latest">최신순</option>
        <option value="price">가격순</option>
      </select>
      <button onClick={handleOrder}></button>
    </div>
  );
}
