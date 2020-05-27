import React, { useState, useEffect } from "react";
import axios from "axios";
import useItems from "../hooks/useItems";
import useAuth from "../hooks/useAuth";
import { RouteComponentProps } from "react-router-dom";
import ListComponent from "../components/listComponent";
import Search from "../common/search";
import Filter from "../common/filter";
import util from "../services/util/index";
import "./css/list.css";

const { onFormat, onOrder, onSearch, validUserId } = util;

interface props extends RouteComponentProps {}

const List: React.SFC<props> = ({ history }) => {
  let { items_monthly, items_total, getMonthlyItem } = useItems();
  let [state, setState] = useState<any>({
    curPage: 1,
    pageSize: 6,
    isEditable: false,
    multiSelect: {},
    value: "",
  });

  //온클릭시 아이템 id를 배열에 넣음
  const { user_id, onLogin } = useAuth();

  let [orderBy, setOrderBy] = useState(["latest", "asc"]);

  useEffect(() => {
    if (user_id === 0) {
      validUserId(vaildUserSucess, validUserFailed);
    } else {
      requestMonthlyItem(user_id);
    }
  }, []);

  useEffect(() => {
    user_id > 0 && user_id !== undefined && requestMonthlyItem(user_id);
  }, [user_id]);

  const requestMonthlyItem = async (user_id: number) => {
    let url = `http://18.217.232.233:8080/monthly_list?user_id=${user_id}`;
    try {
      let res = await axios.get(url);
      res.status === 201 && getMonthlyItem(res.data.monthly_list.items);
    } catch (err) {
      console.log(err);
    }
  };
  const vaildUserSucess = (res: any) => onLogin(res.data);
  const validUserFailed = () => history.replace("/login");

  let pageSizing = (items: any, pageSize: number) => {
    return Math.ceil(items.length / pageSize);
  };
  let handlePageStyle = (target: number) => {
    if (target === state.curPage) {
      return { backgroundColor: "#7e7e7e", color: "#fff" };
    }
  };
  let renderPage = (size: number) => {
    let elements = [];
    for (let i = 1; i <= size; i++) {
      elements.push(
        <div
          key={`page_${i}`}
          onClick={() => setState({ ...state, curPage: i })}
          className="listpage_page"
          style={handlePageStyle(i)}
        >
          {i}
        </div>,
      );
    }
    return elements;
  };
  let filteredList = onOrder(onSearch(items_monthly, state.value), orderBy);

  let pagination = (items: any, currentPage: number, pageSize: number) => {
    const startIndex = (currentPage - 1) * pageSize;
    let result = items.slice(startIndex, startIndex + pageSize);
    return result;
  };

  const handleDelete = (items: any) => {
    return items.map((item: any) => {
      return item.id in state.multiSelect
        ? { ...item, isSelected: true }
        : item;
    });
  };
  let page = handleDelete(
    pagination(filteredList, state.curPage, state.pageSize),
  );

  const handleEdit = (id: number) => {
    let multiSelect = { ...state.multiSelect };
    id in multiSelect ? delete multiSelect[id] : (multiSelect[id] = true);
    setState({ ...state, multiSelect });
  };
  const handleClick = ({ id }: any) => {
    console.log(id);
    let curItem = items_monthly.filter((item: any) => item.id === id);
    setState({ ...state, curItem });
  };

  const handleEditModeClick = () => {
    let isEditable = state.isEditable ? false : true;
    setState({ ...state, isEditable, multiSelect: {} });
  };
  const handleEditBtnStyle = () => {
    if (state.isEditable === true) {
      // return { boxShadow: "3px 6px 16px rgba(0,0,0,0.02)",border:'' };
      return { boxShadow: "0 0 0 2.5px #ff7272 inset", border: "none" };
      // return { backgroundColor: "5A5A5A" };
    }
  };
  return (
    <div className="listpage_container">
      <div className="listpage_filter_zone"></div>
      {/* box-shadow: 3px 6px 16px rgba(0, 0, 0, 0.08); */}
      <div className="listpage_items_modal">
        <ListComponent
          onFormat={onFormat}
          items={page}
          location="listpage"
          isEditable={state.isEditable}
          handleEdit={handleEdit}
          handleClick={handleClick}
        />
        <div className="listpage_page_group">
          {renderPage(pageSizing(filteredList, state.pageSize))}
        </div>
      </div>
      <div className="listpage_search_zone">
        <Search onChange={setState} location="listpage" state={state} />
        <Filter onChange={setOrderBy} orderBy={orderBy} location="listpage" />
        <button
          onClick={handleEditModeClick}
          className="listpage_editmode_btn"
          style={handleEditBtnStyle()}
        >
          편집하기
        </button>
      </div>
    </div>
  );
};

export default List;
