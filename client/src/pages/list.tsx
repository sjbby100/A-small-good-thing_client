import React, { useState } from "react";
import useItems from "../hooks/useItems";
// import useAuth from "../hooks/useAuth";
import ListComponent from "../components/listComponent";
import Search from "../common/search";
import Filter from "../common/filter";
import { handleSeacrh } from "../services/util/onSearch";
import { handleOrder } from "../services/util/onOrder";
import onFormat from "../services/util/onFormat";
import "./css/list.css";
const List: React.SFC = () => {
  let { items_monthly, items_total } = useItems();
  let [state, setState] = useState({
    curPage: 1,
    pageSize: 6,
    orderBy: ["latest", "asc"],
  });
  let [value, setValue] = useState("");

  let pageSizing = (items: any, pageSize: number) => {
    return Math.ceil(items.length / pageSize);
  };

  let renderPage = (size: number) => {
    let elements = [];
    for (let i = 1; i <= size; i++) {
      elements.push(
        <div
          key={`page_${i}`}
          onClick={() => setState({ ...state, curPage: i })}
        >
          {i}
        </div>,
      );
    }
    return elements;
  };

  let pagination = (items: any, currentPage: number, pageSize: number) => {
    const startIndex = (currentPage - 1) * pageSize;
    let result = items.slice(startIndex, startIndex + pageSize);
    return result;
  };
  let page = pagination(items_monthly, state.curPage, state.pageSize);
  return (
    <div className="listpage_container">
      <div className="listpage_filter_zone"></div>
      <div className="listpage_search_zone">
        <Search onChange={setValue} location="listpage" />
      </div>
      <div className="listpage_items_modal">
        <ListComponent onFormat={onFormat} items={page} location="listpage" />
        {renderPage(pageSizing(items_monthly, state.pageSize))}
      </div>
    </div>
  );
};

export default List;
