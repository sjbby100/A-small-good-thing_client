import React, { useState } from "react";
import useItems from "../hooks/useItems";
import useAuth from "../hooks/useAuth";
import ListComponent from "../components/listComponent";
import onFormat from "../services/util/onFormat";
import "./css/list.css";
const List: React.SFC = () => {
  let { items_monthly } = useItems();
  let [value, setValue] = useState("");
  return (
    <div className="listpage_container">
      <div className="listpage_filter_zone"></div>
      <div className="listpage_items_modal">
        <ListComponent
          onFormat={onFormat}
          items={items_monthly}
          location="listpage"
        />
      </div>
    </div>
  );
};

export default List;
