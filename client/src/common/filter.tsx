import React from "react";
import asc from "../img/1.svg";
import desc from "../img/2.svg";
export default function Filter({ onChange, orderBy }: any) {
  const handleOrder = () => {
    orderBy[1] === "asc"
      ? onChange([orderBy[0], "desc"])
      : onChange([orderBy[0], "asc"]);
  };
  const handlerIcon = () => {
    console.log(orderBy);
    if (orderBy[1] === "asc") {
      return asc;
    } else {
      return desc;
    }
  };
  return (
    <div className="main_filter_box">
      <select
        onChange={({ target: { value } }) => onChange([value, "asc"])}
        className="main_filter"
      >
        <option value="latest">최신순</option>
        <option value="price">가격순</option>
      </select>
      <button
        onClick={handleOrder}
        className="main_filter_order_btn"
        style={{ background: `url(${handlerIcon()}) no-repeat` }}
      ></button>
    </div>
  );
}
