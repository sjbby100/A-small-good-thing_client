import React from "react";

export default function Filter({ onChange }: any) {
  return (
    <div className="main_filter_box">
      <select onChange={({ target: { value } }) => onChange([value, "asc"])}>
        <option value="latest">최신순</option>
        <option value="price">가격순</option>
      </select>
    </div>
  );
}
